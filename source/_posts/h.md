---
banner_img: /images/uploads/1616421416500-wallhaven-rddv31.jpg
index_img: /images/uploads/1616421416500-wallhaven-rddv31.jpg
title: h
date: 2023-04-16 22:02:06
updated: 2023-04-16 22:02:06
comments: true
---
<div id="dp" style="width: 800px;height: 600px">
        <video controls id="dp1"
            src="https://link.jscdn.cn/sharepoint/aHR0cHM6Ly9wcmsxNDA4LW15LnNoYXJlcG9pbnQuY29tLzp2Oi9nL3BlcnNvbmFsL2NvczFfcHJrMTQwOF9vbm1pY3Jvc29mdF9jb20vRWNyS0p3Nm1HSTFJaEZQZC1md0RqVGtCVXFkNVh1bUhsOGJ0eFdkanNRRzNIZz9lPVZzdXRMZw.mp4">
        </video>
    </div>
    <script>
        let dock = document.getElementById("dp");
        let du = dock.querySelector("video");
        console.log(du.src);
        const dp = new DPlayer({
            container: dock,
            video: {
                url: du.src,
            },
        });
    </script>