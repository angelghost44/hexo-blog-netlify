<script>
        let dock = document.getElementById("dp");
        let du = dock.querySelector("video");
        console.log(du.src);
        const dp = new DPlayer({
            container: dock,
            video: {
                url: du.src,
                hotkey: true,
            },
        });
    </script>
