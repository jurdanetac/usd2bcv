import datetime
import sqlite3

import xlrd

database = "database.db"
filename = "2_1_3"

with sqlite3.connect(database) as con:
    # open workbook
    book = xlrd.open_workbook(f"{filename}.xls")

    # create database
    cur = con.cursor()
    # drop table
    cur.execute(f"DROP TABLE IF EXISTS `{book.sheet_names()[0]}`;")
    # create table
    cur.execute(
        f"CREATE TABLE `{book.sheet_names()[0]}` (`date` DATE NOT NULL,`source` TEXT,`bolivar` TEXT,`buy` REAL,`sell` REAL);"
    )

    sh = book.sheet_by_index(0)

    for rx in range(sh.nrows):
        if isinstance(sh.row(rx)[0].value, float):
            # excel stores dates as floats
            datetime_tuple = xlrd.xldate_as_tuple(sh.row(rx)[0].value, book.datemode)
            # strip hours, minutes, seconds
            date_tuple = datetime_tuple[:3]

            date = datetime.date(*date_tuple).isoformat()
            source = "BCV"
            bolivar = "Bs"
            buy = sh.row(rx)[1].value
            sell = sh.row(rx)[2].value

            # insert into database
            cur.execute(
                f"INSERT INTO `{book.sheet_names()[0]}` (`date`, `source`, `bolivar`, `buy`, `sell`) VALUES (?, ?, ?, ?, ?);",
                (date, source, bolivar, buy, sell),
            )

    print(f"Data written to: {database}/{book.sheet_names()[0]}")
