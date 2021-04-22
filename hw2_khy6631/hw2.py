# --------------------------------------------------
# Start of the setup code.
# DO NOT change any of the setup code!
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
    result = ""
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


db_school = 'SchoolScheduling.sqlite'
conn1 = create_connection(db_school)
db_sales = 'SalesOrders.sqlite'
conn2 = create_connection(db_sales)

# end of setup code
# --------------------------------------------------




# --------------------------------------------------
# Your work starts here.
# TODO: put your sql query in the following triple quotes.
# Your query can span multiple lines beacause we used triple quotes!
# DO NOT change variable names.

query1 = '''
SELECT StudFirstName, StudLastName FROM Students WHERE StudMajor IN
    (SELECT MajorID FROM Majors WHERE (Major = 'Music' OR Major = 'Art')) 
ORDER BY StudLastName DESC;
'''
query2 = '''
SELECT 100 * (SELECT COUNT(*) FROM Students WHERE StudMajor IN 
    (SELECT MajorID FROM Majors WHERE (Major = 'English' OR Major = 'Mathematics'))) 
    / COUNT(*) FROM Students;
'''
query3 = '''
SELECT COUNT(DISTINCT StaffID) FROM Faculty_Classes;
'''
query4 = '''
SELECT SUM(ProficiencyRating)/COUNT(*) FROM Faculty_Subjects WHERE StaffID = 
    (SELECT StaffID FROM Staff WHERE (StfFirstName = 'Liz' AND StfLastname = 'Keyser'));
'''
query5 = '''
SELECT StfLastname FROM Staff WHERE LENGTH(StfLastname) > 9;
'''
query6 = '''
SELECT COUNT(*) FROM Customers WHERE CustState = 'TX';
'''
query7 = '''
SELECT COUNT(DISTINCT OrderNumber) FROM Orders WHERE employeeID =
    (select EmployeeID FROM Employees where (EmpFirstName = 'Mary' AND EmpLastName = 'Thompson'));
'''
query8 = '''
SELECT SUM(QuotedPrice * QuantityOrdered) FROM Order_Details WHERE OrderNumber =
    (SELECT OrderNumber FROM Orders WHERE CustomerID = 
        (SELECT CustomerID FROM Customers WHERE (CustFirstName = "Alaina" AND CustLastName = "Hallmark")));
'''
query9 = '''
SELECT VendState FROM Vendors JOIN Product_Vendors ON Vendors.VendorID = Product_Vendors.VendorID WHERE ProductNumber =
    (SELECT ProductNumber FROM Products WHERE ProductName = "Cosmic Elite Road Warrior Wheels");
'''
query10 = '''
SELECT MAX(CustState), COUNT(*) FROM Customers WHERE CustState = (SELECT MAX(CustState) FROM Customers);
'''
# End of your code.
# --------------------------------------------------



# --------------------------------------------------
# printing out results.
# DO NOT change any of the following code!

print('Q1:\n',execute_query(conn1, query1))
print('Q2:\n',execute_query(conn1, query2))
print('Q3:\n',execute_query(conn1, query3))
print('Q4:\n',execute_query(conn1, query4))
print('Q5:\n',execute_query(conn1, query5))

print('\n')
print('Q6:\n',execute_query(conn2, query6))
print('Q7:\n',execute_query(conn2, query7))
print('Q8:\n',execute_query(conn2, query8))
print('Q9:\n',execute_query(conn2, query9))
print('Q10:\n',execute_query(conn2, query10))


# always close the database after the query!
conn1.close()
conn2.close()
