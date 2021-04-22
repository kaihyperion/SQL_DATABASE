import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print("create_connection error:")
        print(e)
    return conn

def execute_query(conn, query):
    result =""
    try:
        cur = conn.cursor()
        cur.execute(query)
        rows = cur.fetchall()
        for row in rows:
            result += str(row)+"\n"
    except Error as e:
        print("execute_query error:")
        print(e)
    return result

db = '/home/kyperion/Desktop/cs217/Recipes.sqlite'
conn = create_connection(db)

query = '''
select * from measurements;
'''

print(execute_query(conn, query))
conn.close()
