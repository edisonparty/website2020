<?php

$ajax_url = admin_url('admin-ajax.php');
$options = get_fields('options');
$sections = get_field('sections');

$is_blog_post = false;
$blog_post = [];

/* function apply_content_filters($sections) {
    if (!empty($sections)) {

        foreach ($sections as $section_index => $section) {


        }
    }

    return $sections;
} */

// $sections = apply_content_filters($sections);
$options['currentPostId'] = $post->ID;
?>

<?php get_header(); ?>

<script>
    window.ajaxUrl = '<?php echo $ajax_url; ?>';
    window.__INITIAL_STATE__ = {
        page: {
            sections: <?php echo json_encode($sections); ?>,
            postId: <?php echo $post->ID; ?>,
        },
        options: <?php echo json_encode($options); ?>,
    };
</script>
<div id="react-root"></div>
<?php get_footer();
