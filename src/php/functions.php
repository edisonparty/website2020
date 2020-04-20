<?php

$dev_fake_ie = false;

function is_ie11_or_older() {
    global $dev_fake_ie;

    if ($dev_fake_ie) {
        return true;
    }

    $v = get_ie_version();
    return $v > 0 && $v < 12;
}

function get_ie_version() {
    global $dev_fake_ie;

    if ($dev_fake_ie) {
        return 11;
    }

    $ua = $_SERVER['HTTP_USER_AGENT'];
    $msie = strpos($ua, 'MSIE ');
    $trident = strpos($ua, 'Trident/');
    $edge = strpos($ua, 'Edge/');

    if ($msie !== false) {
        return 10; // Really means '10 or older'
    } elseif ($trident !== false) {
        return 11;
    } elseif ($edge !== false) {
        return 12;
    }

    return 0;
}

function get_ms_browser_classes() {
    global $dev_fake_ie;

    if ($dev_fake_ie) {
        return 'browser-ie browser-ie-11';
    }

    $ua = $_SERVER['HTTP_USER_AGENT'];
    $msie = strpos($ua, 'MSIE ');
    $trident = strpos($ua, 'Trident/');
    $edge = strpos($ua, 'Edge/');

    if ($msie !== false) {
        return 'browser-ie browser-ie-pre-11';
    } elseif ($trident !== false) {
        return 'browser-ie browser-ie-11';
    } elseif ($edge !== false) {
        return 'browser-edge';
    }

    return '';
}

remove_action('wp_head', '_wp_render_title_tag', 1);

add_image_size('x_wide', 1440, 1440);
add_image_size('xx_wide', 1600, 1600);
add_image_size('xxx_wide', 2000, 2000);

function wps_deregister_styles() {
    wp_dequeue_style('wp-block-library');
}
add_action('wp_print_styles', 'wps_deregister_styles', 100);

function mytheme_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
add_action('wp_before_admin_bar_render', 'mytheme_admin_bar_render');

function remove_menus() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
    remove_menu_page('index.php');
    // remove_menu_page('edit.php');
    remove_menu_page('edit-comments.php');
    remove_menu_page('themes.php');
    remove_menu_page('users.php');
    remove_menu_page('tools.php');

    if (current_user_can('update_core')) {
        return;
    }

    remove_menu_page('edit.php?post_type=acf-field-group');
    remove_menu_page('plugins.php');
}
add_action('admin_menu', 'remove_menus');

function remove_core_updates() {
    global $wp_version;
    return(object) array('last_checked'=> time(),'version_checked'=> $wp_version);
}
remove_action('wp_version_check', 'wp_version_check');
remove_action('wp_update_plugins', 'wp_update_plugins');
remove_action('wp_update_themes', 'wp_update_themes');
add_filter('pre_site_transient_update_core', 'remove_core_updates'); // hide updates for WordPress itself
add_filter('pre_site_transient_update_plugins', 'remove_core_updates'); // hide updates for all plugins
add_filter('pre_site_transient_update_themes', 'remove_core_updates'); // hide updates for all themes

function sa_sanitize_chars($filename) {
    return strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/', '', $filename));
}
add_filter('sanitize_file_name', 'sa_sanitize_chars', 10);

function akademi_setup() {
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'akademi_setup');

function init_theme() {
}
add_action('init', 'init_theme');

function add_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'add_mime_types');

function wpdocs_dequeue_dashicon() {
    if (current_user_can('update_core')) {
        return;
    }
    wp_deregister_style('dashicons');
}
add_action('wp_enqueue_scripts', 'wpdocs_dequeue_dashicon');

function my_deregister_styles() {
    wp_deregister_style('dashicons');
}
add_action('wp_print_styles', 'my_deregister_styles', 100);

function disable_admin_bar() {
    add_filter('show_admin_bar', '__return_false');
}
add_action('init', 'disable_admin_bar', 1);

// Remove admin bar and inline style from body to push content down
function remove_admin_bar_from_head() {
    remove_action('wp_head', '_admin_bar_bump_cb');
    show_admin_bar(false);
}
add_action('get_header', 'remove_admin_bar_from_head');

 // Remove the horrible bloat that is "wp emojis"
function disable_wp_emojicons() {
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
}
add_action('init', 'disable_wp_emojicons');

function my_deregister_scripts() {
    wp_deregister_script('wp-embed');
}
add_action('wp_footer', 'my_deregister_scripts');

function echo_theme_file_path($path) {
    echo get_template_directory_uri() . '/' . $path;
}

$alt_info = array(
    'image_filename_without_extension_or_size' => 'Alt text',
);

function remove_quotation_marks($str) {
    return str_replace('"', "", $str);
}

function get_og_tags($p) {
    $og_title = remove_quotation_marks(get_field('og_title', $p->ID));
    $og_description = remove_quotation_marks(get_field('og_description', $p->ID));
    $og_image = get_field('og_image', $p->ID);
    $meta_keywords = remove_quotation_marks(get_field('meta_keywords', $p->ID));

    if ($og_title == "") {
        $og_title = remove_quotation_marks(get_field('og_title', 'options'));
        if ($og_title == "") {
            $og_title = $p->post_title;
        }
    }

    if ($og_description == "") {
        $og_description = remove_quotation_marks(get_field('og_description', 'options'));
    }
    if ($og_image == "") {
        $og_image = get_field('og_image', 'options');
    }
    if ($meta_keywords == "") {
        $meta_keywords = remove_quotation_marks(get_field('meta_keywords', 'options'));
    }

    return array(
        'og_title' => $og_title,
        'og_description' => $og_description,
        'og_image' => $og_image,
        'meta_keywords' => $meta_keywords
    );
}

/**
 * CUSTOM ADMIN STYLES
 */
function enqueue_custom_admin_styles() {
    wp_enqueue_style('custom_wp_admin_css', get_template_directory_uri() . '/admin-style.css', false, '1.0.0');
  }
  add_action( 'admin_enqueue_scripts', 'enqueue_custom_admin_styles', 1000 );

include('custom_post_types.php');
include('autocompress.php');

add_action( 'wp_ajax_participants', 'get_participants' );
add_action( 'wp_ajax_nopriv_participants', 'get_participants' );

function get_participants() {

    $args = array(
        'post_type' => 'ed-participant',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'order_by' => 'publish_date',
        'order' => 'ASC'
    );

    $posts = get_posts($args);
    $result = array();

    foreach($posts as $p) {
        $result[] = array(
            'handle' => get_field('handle', $p->ID),
            'group' => get_field('group', $p->ID),
            'country' => get_field('country', $p->ID)
        );
    }

    echo json_encode(
        array(
            'participants' => $result
        )
    );

    // Don't forget to stop execution afterward.
    wp_die();
}

add_action( 'wp_ajax_signup', 'signup' );
add_action( 'wp_ajax_nopriv_signup', 'signup' );

function signup() {
    $email = $_GET['email'];
    $handle = $_GET['handle'];
    $country = $_GET['country'];
    $group = $_GET['group'];

    $email = strtolower($email);

    $args = array(
        'post_type' => 'ed-participant',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'order_by' => 'publish_date',
        'order' => 'ASC'
    );

    $posts = get_posts($args);
    $result = array();

    $fail = false;

    foreach($posts as $p) {
        $test_email = strtolower(get_field('email', $p->ID));
        if ($email == $test_email) {
            $fail = true;
            break;
        }
    }

    if ($fail) {
        echo json_encode(
            array(
                'error' => 1
            )
        );
        wp_die();
    }

    $insert_post = array(
        'post_title' => sa_sanitize_chars($handle),
        'post_type' => 'ed-participant',
        'post_status' => 'publish'
    );

    $insert_id = wp_insert_post($insert_post);

    update_field('field_5e9c204b80fda', $email, $insert_id);
    update_field('field_5e9c13912f8be', $handle, $insert_id);
    update_field('field_5e9c13a32f8c0', $group, $insert_id);
    update_field('field_5e9c13972f8bf', $country, $insert_id);

    echo json_encode(
        array(
            'error' => 0
        )
    );
    wp_die();
}