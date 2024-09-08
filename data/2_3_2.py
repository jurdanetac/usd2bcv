import datetime
import sqlite3

import xlrd

database = "database.db"
filename = "2_3_2"
tablename = "1996-2023"

MONTHS = {
    "Enero": 30,
    "Febrero": 28,
    "Marzo": 31,
    "Abril": 30,
    "Mayo": 31,
    "Junio": 30,
    "Julio": 31,
    "Agosto": 31,
    "Septiembre": 30,
    "Octubre": 31,
    "Noviembre": 30,
    "Diciembre": 31,
}
LEAP_YEARS = [
    1996,
    2000,
    2004,
    2008,
    2012,
    2016,
    2020,
    2024,
]

with sqlite3.connect(database) as con:
    # open workbook
    book = xlrd.open_workbook(f"{filename}.xls")

    # create database
    cur = con.cursor()
    # drop table
    cur.execute(f"DROP TABLE IF EXISTS `{tablename}`;")
    # create table
    cur.execute(
        f"CREATE TABLE `{tablename}` (`date` DATE NOT NULL,`source` TEXT,`bolivar` TEXT,`buy` REAL,`sell` REAL);"
    )

    sh = book.sheet_by_index(0)
    year = None

    for rx in range(sh.nrows):
        if sh.row(rx)[0].value in range(1995, 2024):
            year = int(sh.row(rx)[0].value)
            print(f"Processing year: {year}")
        elif sh.row(rx)[0].value.strip() in MONTHS.keys():
            month = list(MONTHS.keys()).index(sh.row(rx)[0].value.strip()) + 1
            days = MONTHS[sh.row(rx)[0].value.strip()]

            if month == 2 and year in LEAP_YEARS:
                days = 29

            date = datetime.date(year, month, days).isoformat()
            print(f"Processing date: {date}")

            source = "BCV"
            bolivar = "Bs."

            buy = None
            sell = None

            # "-" means empty column
            if sh.row(rx)[2].value == "-":
                buy = round(sh.row(rx)[6].value, 2)
                sell = round(sh.row(rx)[8].value, 2)
            else:
                buy = round(sh.row(rx)[2].value, 2)
                sell = round(sh.row(rx)[4].value, 2)

            # insert into database
            cur.execute(
                f"INSERT INTO `{tablename}` (`date`,`source`,`bolivar`,`buy`,`sell`) VALUES (?,?,?,?,?);",
                (
                    date,
                    source,
                    bolivar,
                    buy,
                    sell,
                ),
            )

            # special case for 2010 where data has two types of exchange rates
            if year == 2010:
                # insert into database the other type of exchange rate
                buy = round(sh.row(rx)[2].value, 2)
                sell = round(sh.row(rx)[4].value, 2)

                cur.execute(
                    f"INSERT INTO `{tablename}` (`date`,`source`,`bolivar`,`buy`,`sell`) VALUES (?,?,?,?,?);",
                    (
                        date,
                        source,
                        bolivar,
                        buy,
                        sell,
                    ),
                )

    print(f"Data written to: {database}/{tablename}")
