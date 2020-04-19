<?php
    global $staticDomain;
    global $staticBasePath;
?>

<% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
        <script src="<?php echo $staticBasePath; ?>/<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
<% } %>
    </body>
</html>
