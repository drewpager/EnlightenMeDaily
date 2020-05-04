<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'startwordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '@=,U+u@ J*T!p1x.C<|QImjqrkX><X`;w/iK=(mq.n7%A)P(BU6,y}yY;1TJr,N<' );
define( 'SECURE_AUTH_KEY',  'Ms.[axc_6WfRGNAF`G[?ZA&y~qRJmN!h/aVwea+|h(U_&u e,@%ajP@QH$=c} Z-' );
define( 'LOGGED_IN_KEY',    '=0}1Dtt1G)HEw`ZFwNN%Pd7mwA=9a8P6+i9^xIeMH/,~?Ia)<P0,3)dzZGbxr]JP' );
define( 'NONCE_KEY',        '6x7Tb].0TDQ#NtX[W$tQGK5KvD0XZQuO0T!LAX=^jsz(li{0`opv}(@2bE(Y|=gJ' );
define( 'AUTH_SALT',        'c!N]J0wx9WoKM~=v;su;f^HBetORP7fn{q.2]BR#74s2uZ{cx8BB:(Rhh?U([z4c' );
define( 'SECURE_AUTH_SALT', '24FnY 61)PCFf/b__!L+u8%bOetpquS(pSfQ<t_8{0h0?az&N-0vU}w_],h7}xn?' );
define( 'LOGGED_IN_SALT',   '<>/E>tjkU!*|sHc?}5 4p}RIp?CTvp4~rws}:ZgVN0_`ybAaxQ}*$!>?;v)?AVC%' );
define( 'NONCE_SALT',       'D|+(7]x5J_b@0qUNh`(%iq_@{I]{oqrNUdOk*piB4?&EC6&3YP> r$UmSl?xWAjp' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'xcv4529_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
