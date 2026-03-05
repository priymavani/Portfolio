export default function sitemap() {
    const baseUrl = 'https://portfolio-next-priymavani.vercel.app'; // Replace with actual domain

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Add other routes if you have multiple pages
    ];
}
