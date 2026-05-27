# BUCS Messaging System

A lightweight PHP-based student messaging system built for use with XAMPP mysql in local server.

## Features

- User registration and login
- Compose, send, and view messages
- Inbox and Sent message views
- Reply to messages
- Delete messages
- Profile management with password update and show/hide password toggles
- Enrolled classes view
- File upload/download support (via `files.php`)

## Project Structure

- `index.php` – registration page
- `login.php` – login page
- `dashboard.php` – main dashboard after login
- `inbox.php` – received messages
- `sent.php` – sent messages
- `compose.php` – create a new message
- `view_message.php` – read a single message
- `profile.php` – user profile and password update
- `classes.php` – enrolled classes list
- `files.php` – file management page
- `includes/config.php` – database and application configuration
- `assets/css/style.css` – main stylesheet
- `assets/js/app.js` – client-side behavior and validation
- `database.sql` – database schema and sample setup
- `uploads/` – file upload storage directory

## Requirements

- PHP 7.4 or newer
- MySQL / MariaDB
- Apache (XAMPP, WAMP, or similar)

## Installation

1. Place the project folder into your web server document root. Example for XAMPP:

   ```bash
   C:\xampp\htdocs\bucs_mess_system
   ```

2. Create the database using the provided SQL file:

   - Open phpMyAdmin or MySQL CLI
   - Create a new database named `bucs_messaging`
   - Import `database.sql`

3. Update the database configuration in `includes/config.php` if needed:

   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   define('DB_NAME', 'bucs_messaging');
   define('BASE_URL', '/bucs/');
   ```

   If your project folder is not served at `/bucs/`, change `BASE_URL` to the correct path, for example `/bucs_mess_system/`.

4. Ensure the `uploads/` directory is writable by the web server.

## Running the App

Open the app in your browser using the configured URL. For example:

- `http://localhost/bucs/`
- or if the folder name differs: `http://localhost/bucs_mess_system/`

## Notes

- Passwords are currently hashed with `md5()` in the PHP code. For production use, update this to a stronger hashing method such as `password_hash()`.
- The client-side JavaScript provides validation and password show/hide controls on forms.
- Adjust `BASE_URL` in `includes/config.php` if you move the app folder or change access path.

## Recommended Improvements

- Use prepared statements instead of direct query interpolation
- Add file type validation for uploads
- Upgrade password storage to `password_hash()` / `password_verify()`
- Add email notifications or real-time updates
