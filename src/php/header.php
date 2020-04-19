<?php
        global $staticDomain;
        global $staticBasePath;
?>
<!DOCTYPE html>
<?php $og_tags = get_og_tags($post); ?>
<html>
    <head>
        <title><?php echo get_bloginfo('name'); ?> | <?php echo $post->post_title; ?> </title>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

<% for (var css in htmlWebpackPlugin.files.css) { %>
        <link rel="preload" href="<?php echo $staticBasePath; ?>/<%= htmlWebpackPlugin.files.css[css] %>" as="style">
<% } %>
<% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
        <link rel="preload" href="<?php echo $staticBasePath; ?>/<%= htmlWebpackPlugin.files.chunks[chunk].entry %>" as="script">
<% } %>

        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $staticDomain; ?>/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $staticDomain; ?>/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $staticDomain; ?>/favicon-16x16.png">
        <link rel="manifest" href="<?php echo $staticDomain; ?>/site.webmanifest">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

        <meta name="description" content="<?php echo $og_tags['og_description']; ?>" />
        <meta name="keywords" content="<?php echo $og_tags['meta_keywords']; ?>">
        <meta property="og:title" content="<?php echo $og_tags['og_title']; ?>" />
        <meta property="og:description" content="<?php echo $og_tags['og_description']; ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="<?php echo get_permalink($post->ID); ?>" />
        <meta property="og:image" content="<?php echo $og_tags['og_image']; ?>" />
<% for (var css in htmlWebpackPlugin.files.css) { %>
        <link href="<?php echo $staticBasePath; ?>/<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
<% } %>
        <?php wp_head(); ?>
    </head>

    <body>
