<?php
/**
 * The base configuration for WordPress
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

define('DB_NAME', 'edison2020');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_HOST', '127.0.0.1');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

$siteroot = ($_SERVER['HTTPS'] ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'];
define('WP_SITEURL', $siteroot);
define('WP_HOME', $siteroot);
define('WP_POST_REVISIONS', 3);

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '4717fb653f043272b4e38abb0611c6fa571ae8c64e7ec74e56b31a81274500c442c14046b87b838e0dc74aeb017a7ab0040338b6bcf08e4892cdb9eb394bab9d');
define('SECURE_AUTH_KEY',  'e04a7eaef21e2fd094fb2b8ccd7cd37d69e479db816fbdc2e43501264f31c27a0a90e06fb8b3045e1c03ce1e457a3b1d8e2fcfc2e9940968a5cd32b21c375bd9');
define('LOGGED_IN_KEY',    '082a317eb7694c3f189637d22c775c9d6a254db90d170c58f58f7df764fdbf4260610bea4143638b0813c82e2205919490c681a64b3e82532df1f392b98556be');
define('NONCE_KEY',        '43a599f06ddb8790ae583b59d22b3e550da3864021bd8f013b51f2f6a629cf7ad5d680cdb2ffbd492c5d745d0daebd07c8454eb5baedafe420403af16f237434');
define('AUTH_SALT',        '662379bcd37cafd06bc1063640ab07e8781b198625cc41063cd19ca76061a65a5419c860bd39cc35dae1018e263333938e25d83b31e6b4e6b36e2c3100c31a9a');
define('SECURE_AUTH_SALT', '1cf0898e469bd8adadd5dfeee27f833ca374627faf07200b225328c070f9639a8311d17d04fb08b0eea243097abaa1921fd666afc51f9d2b8e88a7ee33cf2844');
define('LOGGED_IN_SALT',   'a709f0b2501d94a320e35d48508b5ec309c78e257851847c28820f4046176ad6c52ec0ab01f98de80d10014a0bb56d4617232b72666e361640463c4a081bae26');
define('NONCE_SALT',       '1bdd4976fe8cd96ae2dd9f5641019751bd0b4d1fdce34f5342f845b378c528204351d65e737af2b34b1794e61060831f62ead85f67af755df8871436f9a8b25b');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
