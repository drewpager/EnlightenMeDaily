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
define( 'DB_CHARSET', 'utf8' );

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
define('AUTH_KEY',         '|+W8|fRG-(UZM+Igd Q-~o:F#4QRh&gw60M9;w;f)H&4Bw@y3N|~!/+sCt] #V%`');
define('SECURE_AUTH_KEY',  '^LrRURGawM?l|q/tR~@FfPGFhP!UG*n`Q+|Fk[n$^Rft9.yV*e:5BAba.5CAt4(O');
define('LOGGED_IN_KEY',    's@#Ahn(5*K@5e.kn4Xiyo:bxAR5hdQ|fs~i+H|jg5aw0 7t74Imgl1#*fg|(H^jf');
define('NONCE_KEY',        ':A2-Q601+#Qw.GjndSfA-)XUN=_LCPW -NR;xd7Ha@k(|Mu]W%aT~|MuMgaN<%EO');
define('AUTH_SALT',        '0u[dQQ2Hiwptl#y+-.Ay[IONW!,q*1`z.^:RLtjy9h@ew4?_Ck/0n/*xf[kEN0m,');
define('SECURE_AUTH_SALT', ']Tb?<b?h}w;+1h9lux$:9@bX(ae08+I&qiFHDbZFz+1(E(-<aaH=t+$A.Ktdj.D}');
define('LOGGED_IN_SALT',   'Nq[$0~W4tBM+s}j-KV3-`)]+V4sw!7f^-V|h.kuw0)7+6EOA5<F|4i@V=Af&/Xh8');
define('NONCE_SALT',       '-K#tsq4~<0vQz2Q=OP{/go-,r3E/bFCeu#):hU&Df$vs{5<,LF<oPxm,3HCd4j}h');

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
