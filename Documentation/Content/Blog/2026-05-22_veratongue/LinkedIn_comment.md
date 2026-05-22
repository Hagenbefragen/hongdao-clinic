Here is the link to the full technical breakdown, including the interactive HTML analysis, anatomical mapping diagrams, and visual proof of our quality gate checks:
[Link to Blog.html / DESTILL.ai]

Technical Note: 
To separate the tongue body from its coating under variable consumer lighting, the VeraTongue engine converts the cropped guide canvas from standard RGB into the CIELAB (Lab) color space. 

By applying K-means clustering (k=3), the algorithm isolates:
1. The background (low L*, low saturation)
2. The tongue body (highest positive a* value, mapping the red-green axis)
3. The tongue coating (highest L* value within the segmented tongue body mask)

This allows us to calculate an accurate coating-to-body ratio without uploading raw biometric data or images to external servers. It runs entirely within a sandboxed browser context.
