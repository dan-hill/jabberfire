CCMH IT Department Inventory Software Requirements
==================================================

Database
--------
+ The database will contain information on all equipment managed by
  the IT department, including stock in the warehouse and on the
  floor. 
+ An efficient system for tracking and auditing equipment and
  supplies. Must be generated and unique.

Interface
---------
+ Interface must be responsivly designed.
+ Customer Interface
  + Make an order.
  + Request support.
  + Print return documentation.
  + Track order status.
  + View past orders and actively checked out equipment.
+ Interface for the technition will have:
  + Seperate security
  + Track incomming parts
  + Track inventory levels
  + Send auto-alerts for low levels
  + Track inventory on the floor to departments or clinic
+ System will be useable for budgeting needs and reports

Backend
-------
+ Must run on Microsoft Server. Preferably the system will be OS
  agnostic as it runs on open source, multi platform software.
+ Alerts will need to be sent to a variety of configuralbe methods
  including email, text message, and by user dashboard. Alerts should
  be configurable as to what item and at what threshold an alert
  should be sent.
+ 

Scalability
-----------
+ Entire system must be generic so it can be adapted to track
  inventories in other departments of the organization at a later date.

Documentation
-------------
+ A user manual must be written that will cover all user functionality
  in non-technical language.
+ Help system for handling the inventory system's support from within
  the interface. Will not be tied to the the currently operated
  helpdesk system that the IT department uses. 
+ Development documentation must be maintained with detailed
  information on internal functionality of the entire system.
+ A detailed security policy as it pertains to the use and
  implementationo of the system.

Security
--------
+ The system will require encrypted connections via SSL.
