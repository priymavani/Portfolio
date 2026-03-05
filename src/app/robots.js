export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/edit/'],
            },
        ],
        sitemap: 'https://www.priymavani.in/sitemap.xml',
    };
}
