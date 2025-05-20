// The following below is a suggested schema for the data we will have in our
//  database and the relationships they will have:

// PRODUCTS TABLE

// Column	        Type	        Notes
// id	            INT(PK)	        Auto - increment
// name	            VARCHAR(255)	Product name
// description	    TEXT	        Optional
// price	        DECIMAL(10, 2)	Regular price
// sale_price	    DECIMAL(10, 2)	Nullable
// image_url	    TEXT	        Primary product image
// rating	        FLOAT	        Optional
// review_count     INT	            Optional
// is_best_seller	BOOLEAN	        Flag for homepage
// is_new	        BOOLEAN	        Flag for homepage
// stock	        INT	            Units available
// category_id	    INT(FK)	        Foreign key to categories
// subcategory	    VARCHAR(255)	Optional grouping inside category



// CATEGORIES TABLE. We can start by defining the categories of the products
// We will be selling for trendy so that on each product we can link it to a specific
// Category.

// Column	        Type	        Notes
// id	            INT (PK)	    "pillows", "curtains", etc.
// name	            VARCHAR(255)	Display name
// description	    TEXT	        Optional



// PRODUCT COLORS TABLE. Here we will define the colors we have in our store and specify
// The specific product that we are linking it too.

// Column	        Type	        Notes
// id	            INT (PK)	    Autoincrement
// product_id	    INT (FK)	    Links to products
// name	            VARCHAR(50)	    e.g. "white"
// hex	            CHAR(7)	        Optional — for color swatch
// in_stock	        BOOLEAN	        Optional per color



// PRODUCT IMAGES. Here we will store the urls images for a specific product.

// Column	        Type	        Notes
// id               INT (PK)	    Autoincrement
// product_id	    INT (FK)	    Links to products
// url	TEXT	    Image           URL
// is_primary	    BOOLEAN	        Optional


// COLLECTIONS TABLE

// Column	        Type	        Notes
// id	            VARCHAR(50)	    e.g. "pillows"
// name	            VARCHAR(255)	e.g. "Luxury Pillow Collection"
// description	    TEXT	        Description


// COLLECTION_PRODUCTS (MANY-TO-MANY JOIN)

// Column	        Type	        Notes
// collection_id	VARCHAR(50) (FK)	
// product_id	    INT (FK)



export const productDatabase = {
    1: {
        id: 1,
        name: 'Luxe Sateen Pillow Set',
        category: 'pillows',
        subcategory: 'sateen',
        price: 250.00,
        salePrice: 200.00,
        description: 'Experience unparalleled softness with our premium sateen pillow set. Made from 100% long-staple cotton with a 600 thread count for luxurious comfort that lasts.',
        details: [
            'Set of 2 standard pillowcases',
            '100% long-staple cotton',
            '600 thread count',
            'Sateen weave for silky smoothness',
            'Double-stitched seams for durability',
            'Hidden zipper closure'
        ],
        materials: '100% Egyptian Cotton',
        dimensions: '20" x 26" (Standard)',
        care: 'Machine wash cold, tumble dry low',
        colors: [
            { name: 'white', hex: '#ffffff', inStock: true },
            { name: 'cream', hex: '#f5f5dc', inStock: true },
            { name: 'graphite', hex: '#4d4d4d', inStock: true },
            { name: 'navy', hex: '#000080', inStock: false },
            { name: 'sage', hex: '#9CAF88', inStock: true }
        ],
        images: [
            'https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1566669437688-37f7c4c9d1a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1586449480561-6d7f57a6b3cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        rating: 4.8,
        reviewCount: 142,
        isNew: false,
        isBestSeller: true,
        stock: 4
    },
    7: {
        id: 7,
        name: 'Silk Pillowcases',
        category: 'pillows',
        subcategory: 'silk',
        price: 149.00,
        salePrice: 126.65,
        description: 'Indulge in the ultimate sleep experience with our 100% pure mulberry silk pillowcases. Naturally hypoallergenic and temperature regulating for healthier hair and skin.',
        details: [
            '100% Grade 6A Mulberry Silk',
            '22 momme weight for durability',
            'Hidden zipper closure',
            'Double-sided silk (both sides equally luxurious)',
            'Reduces hair breakage and sleep wrinkles',
            'Naturally hypoallergenic and dust mite resistant'
        ],
        materials: '100% Mulberry Silk (Grade 6A, 22 momme)',
        dimensions: '20" x 26" (Standard)',
        care: 'Hand wash cold with mild detergent, lay flat to dry',
        colors: [
            { name: 'white', hex: '#ffffff', inStock: true },
            { name: 'cream', hex: '#f5f5dc', inStock: true },
            { name: 'dune', hex: '#C2B280', inStock: false },
            { name: 'sienna', hex: '#A0522D', inStock: true }
        ],
        images: [
            'https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1566669437688-37f7c4c9d1a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1586449480561-6d7f57a6b3cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        rating: 4.9,
        reviewCount: 89,
        isNew: true,
        isBestSeller: false,
        stock: 8
    }
};

export const collections = [
    {
        id: 'pillows',
        name: 'Luxury Pillow Collection',
        description: 'Engineered for perfect comfort and support',
        products: [
            {
                id: 1,
                name: 'Velvet Pillowcases',
                price: 250.0,
                salePrice: 200.0,
                image: 'https://smithyhomecouture.com/cdn/shop/files/2-26.jpg?v=1723558559&width=750',
                colors: ['white', 'cream', 'graphite']
            },
            {
                id: 2,
                name: 'Silk Pillowcases',
                price: 280.0,
                image: 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/8515181/3.jpg?9999',
                colors: ['ivory', 'blush', 'charcoal']
            },
            {
                id: 3,
                name: 'Fluffy Pillows',
                price: 250.0,
                salePrice: 200.0,
                image: 'https://image.kilimall.com/kenya/shop/store/goods/8539/2023/09/16951118331689754310adad044a895a6df0c2e476334.jpg?x-image-process=image/format,webp/resize,w_720',
                colors: ['white', 'taupe']
            }
        ]
    },
    {
        id: 'decorative_pillows',
        name: 'Decorative Pillows',
        description: 'Everything you need for a coordinated look',
        products: [
            {
                id: 10,
                name: 'Sausage Pillow',
                price: 349.99,
                salePrice: 299.99,
                image: 'https://scontent.fnbo11-1.fna.fbcdn.net/v/t39.30808-6/486452784_122193179492042016_4828494671882089767_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE6Y_9BhTeGSDYk6GpCdACy0-Dn8aLaifbT4OfxotqJ9lH2gRrILJc6QC5SUi9oPmj7QRdUoBIpMlgmxkNuhZeT&_nc_ohc=FA8CuBXmPm4Q7kNvwFGGmLC&_nc_oc=AdmsnvtfdyMbz96DWaAFPs_RRAeINVVNsBY05EDQX21nayNsbLL160sgXNicILx_xkc&_nc_zt=23&_nc_ht=scontent.fnbo11-1.fna&_nc_gid=clfTdr_jmEksAT5254337A&oh=00_AfGcOd-ecsjACExVgESPTwCZu-mTdw-owV7mw4g_qRQcqQ&oe=6807D236',
                colors: ['white', 'stone']
            },
            {
                id: 11,
                name: 'Round Pillow',
                price: 229.99,
                image: 'https://image.kilimall.com/kenya/shop/store/goods/5645/2019/12/5645_06307787285329740.jpg?x-image-process=image/format,webp/resize,w_720#',
                colors: ['white', 'grey']
            },
            {
                id: 12,
                name: 'Knot Pillow',
                price: 229.99,
                image: 'https://scontent.fnbo11-1.fna.fbcdn.net/v/t39.30808-6/485361510_122193181334042016_3630068797050101427_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFEh8cTUT0PPppHoMkPaU2JNqbcPhVa1EE2ptw-FVrUQW0Omn7D9VfI0RXb3MmPJzwCAsPM1PIJ5UVO5FQyl9vb&_nc_ohc=ksuGCmw2rL0Q7kNvwGzyMqi&_nc_oc=AdnCo6q5GP3uNr6QaOW7Q1SllVIkLHS3gb2FSONzDl3wRkaN92RgR9BUNaLUhY8NW0Y&_nc_zt=23&_nc_ht=scontent.fnbo11-1.fna&_nc_gid=wklvqJP_IJTubcevF1jFnw&oh=00_AfHVqQwopkEAddcShD-Lp5K-KjWW1UU328IATM9d8aoYEA&oe=6807F14E',
                colors: ['white', 'grey', 'blue']
            },
            {
                id: 13,
                name: 'Bow Tie Pillow',
                price: 229.99,
                image: 'https://scontent.fnbo11-1.fna.fbcdn.net/v/t39.30808-6/491840420_122196471050042016_1675332266822406876_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF-r49787XwzEqtlf5CUqQc5jTM62BW5i3mNMzrYFbmLRjI6gM7P_hcLgUaM3pLMKaPR6gQk_K8YiT9mHRrO_7s&_nc_ohc=Gvnjt-jUVO8Q7kNvwFRCVJ3&_nc_oc=Adkj9nzJOk3WmhVtw0HwcJ5wLmNdI9Z4_iE3LqojY1v8Zh45xRuHEuEfrAnKt0XBYS4&_nc_zt=23&_nc_ht=scontent.fnbo11-1.fna&_nc_gid=_GWrq1ZGCPpv6DIfxWdiVA&oh=00_AfGcI6XsjQ3oBfPhxaZWxRCLSfp_TaSemz4K8XUKO9nukQ&oe=6807F533',
                colors: ['white', 'grey']
            }
        ]
    },
    {
        id: 'cushions_inserts',
        name: 'Cushions Collection',
        description: 'Engineered for perfect comfort and support',
        products: [
            {
                id: 4,
                name: 'Down Cushion Insert',
                price: 199.0,
                image: 'https://i.ebayimg.com/images/g/fxkAAeSwDuxnvI-9/s-l960.webp',
                colors: ['white', 'cream']
            }
        ]
    },
    {
        id: 'curtains',
        name: 'Designer Curtains',
        description: 'Transform your space with light-filtering elegance',
        products: [
            {
                id: 5,
                name: 'Linen Sheer Curtains',
                price: 149.99,
                image: 'https://i.ebayimg.com/images/g/oAwAAOSwSUBmmk-4/s-l1600.webp',
                colors: ['white', 'oatmeal']
            },
            {
                id: 6,
                name: 'Blackout Drapes',
                price: 179.99,
                salePrice: 159.99,
                image: 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/59/4473632/1.jpg?0619',
                colors: ['navy', 'charcoal', 'cream']
            },
            {
                id: 7,
                name: 'Velvet Curtains',
                price: 199.99,
                image: 'https://i.ebayimg.com/images/g/gYoAAOSw95xnkREC/s-l1600.webp',
                colors: ['emerald', 'sapphire', 'burgundy']
            }
        ]
    },
    {
        id: 'fleece_blankets',
        name: 'Fleece Blankets',
        description: 'Everything you need for a coordinated look',
        products: [
            {
                id: 8,
                name: 'Knighted Blanket',
                price: 349.99,
                salePrice: 299.99,
                image: 'https://image.kilimall.com/kenya/shop/store/goods/8788/2024/01/17059079410480b73dd7a2a8f4c6bbf65f00e0f456514.jpg?x-image-process=image/format,webp/resize,w_720#',
                colors: ['white', 'stone']
            },
            {
                id: 9,
                name: 'Soft Fleece',
                price: 229.99,
                image: 'https://glahpe-suppliers.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-18-at-13.01.07-700x933.jpeg',
                colors: ['white', 'grey']
            }
        ]
    },
];

// Best sellers
export const bestSellers = [
    {
        id: 10,
        name: 'Signature Down Pillow',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        colors: ['white', 'cream']
    },
    {
        id: 11,
        name: 'Organic Cotton Sheets',
        price: 199.99,
        salePrice: 179.99,
        image: 'https://images.unsplash.com/photo-1583845112203-454c7c581fad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        colors: ['white', 'natural']
    },
    {
        id: 12,
        name: 'Weighted Blanket',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1566669437688-37f7c4c9d1a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        colors: ['grey', 'blue']
    }
];

// New arrivals
export const newArrivals = [
    {
        id: 13,
        name: 'Cashmere Throw',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1586449480561-6d7f57a6b3cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        colors: ['cream', 'camel']
    },
    {
        id: 14,
        name: 'Bamboo Sheet Set',
        price: 229.99,
        salePrice: 199.99,
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        colors: ['white', 'sage']
    },
    {
        id: 15,
        name: 'Embroidered Duvet',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        colors: ['ivory', 'blush']
    }
];

// Testimonials data
export const testimonials = [
    {
        id: 1,
        name: "Sarah J.",
        role: "Interior Designer",
        location: "New York, NY",
        rating: 5,
        content: "The quality of these sheets is unmatched. I've never slept better and they've held up beautifully after dozens of washes. Worth every penny!",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 2,
        name: "Michael T.",
        role: "Hotel Owner",
        location: "Miami, FL",
        rating: 5,
        content: "We outfitted all our suites with these linens and our guests won't stop complimenting them. The durability matches the comfort perfectly.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 3,
        name: "Emma R.",
        role: "Home Stager",
        location: "San Francisco, CA",
        rating: 5,
        content: "These window treatments transform any space instantly. The light filtering is magical and the craftsmanship is evident in every detail.",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 3,
        name: "Emma R.",
        role: "Home Stager",
        location: "San Francisco, CA",
        rating: 5,
        content: "These window treatments transform any space instantly. The light filtering is magical and the craftsmanship is evident in every detail.",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
];