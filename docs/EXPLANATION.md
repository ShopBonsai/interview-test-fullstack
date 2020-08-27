# Scenario

You..

- Have a new app going.
- Need to login before you can do anything!
- Want to let your administrators view user login behaviour upon launch

## Task

- Allow users to login via social media. For this ticket, support Google only, while allowing support for others in the future. Store this information in a MongoDB database.
- Create a log of every time a user logs in again. Allow for it to be potentially stored in another database.
- Create an admin page for admin users, and display a history of login counts for all users.

## Assumptions

- Styling will be handled in another ticket. Simple styling is sufficient, and functionality is what counts.
- We understand there will be a lot of users, but we can add support for pagination in another ticket.
- In another scenario, the admin portion could be another app entirely.
- We still don't have a testing framework.

## Considerations

- Handle all data and local state management via apollo
- `access-token` travels via httpOnly cookies
- `refresh-token` is stored in the database, and used to refresh `access-token` when it expires, without the user know. (non-user facing feature)
- Would have prefered to include no REST endpoints in the server, but needed to make google server-side login work. Kept facing a `redirect_url_mismatch` error everytime I would authenticate on the client and send code back to the server. So I kept it fully server side.
- Everytime a user logs in again, a log record is created of that event.

## Setup

- Please makesure to have MongoDB running in the background.
- `yarn` to install dependencies
- `yarn admin:create` to create an admin user. It will prompt you for an email and password.
- Create a .env file, and follow .env.example to know what to populate. I'll be supplying you with a `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `yarn client` for the client
- `yarn server` for the server
- Visit http://localhost:8080 for user app.
- Visit http://localhost:8080/admin for admin app.

## Videos

Please reference the folder `/videos` to see a demonstration of auth behavior for users and admin users.

## Questions, Assistance

Please reach out to `fayadh.almosawi@gmail.com` if you have any questions or issues
