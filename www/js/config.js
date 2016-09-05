var PPConfig = {
    // Local Config
//    serverUrl: 'https://10.210.125.57:9002/purchasingpowermobileservices/service',
//    storeFrontImageUrl: 'https://10.210.125.57:9002',
//    storeFrontLoginUrl: 'https://10.210.125.57:9002/store/login/fast',
//    storeFrontRegistrationUrl: 'https://10.210.125.57:9002/store/login',
//    docUploadLink: 'https://qaodpservice01.purchasingpower.com:8443/odpservices/api/queue/upload?access_token=',
//    searchURL: 'https://10.210.125.57:9002/store/search?text=',
//    setupAllotment: 'https://10.210.125.57:9002/allotment-instructions',
//    viewAccountStatement: 'https://10.210.125.57:9002/store/my-account/account-statement',
//    orderdetails: 'https://10.210.125.57:9002/store/my-account/order/all/{ORDERID}?chn=app&scn=orderdetails',

    // QA Lastest Config
    // serverUrl: 'https://ppc-sf.purchasingpwr.com/purchasingpowermobileservices/service',
    // storeFrontImageUrl: 'https://ppc-sf.purchasingpwr.com',
    // storeFrontLoginUrl: 'https://ppc-sf.purchasingpwr.com/store/login/fast',
    // storeFrontRegistrationUrl: 'https://ppc-sf.purchasingpwr.com/store/login',
    // docUploadLink: 'https://qaodpservice01.purchasingpower.com:8443/odpservices/api/queue/upload?access_token=',
    // searchURL: 'https://ppc-sf.purchasingpwr.com/store/search?text=',
    // setupAllotment: 'https://ppc-sf.purchasingpwr.com/allotment-instructions',
    // viewAccountStatement: 'https://ppc-sf.purchasingpwr.com/store/my-account/account-statement',
    // orderdetails: 'https://ppc-sf.purchasingpwr.com/store/my-account/order/all/{ORDERID}?chn=app&scn=orderdetails',


    // Production
    // serverUrl: 'https://www.purchasingpower.com/purchasingpowermobileservices/service',
    // storeFrontImageUrl: 'https://purchasingpower.com',
    // storeFrontLoginUrl: 'https://www.purchasingpower.com/store/login/fast',
    // storeFrontRegistrationUrl: 'https://www.purchasingpower.com/store/login',
    // docUploadLink: 'https://odpservice01.purchasingpower.com:8443/odpservices/api/queue/upload?access_token=',
    // searchURL: 'https://www.purchasingpower.com/store/search?text=',
    // setupAllotment:'https://www.purchasingpower.com/allotment-instructions',
    // viewAccountStatement: 'https://www.purchasingpower.com/store/my-account/account-statement',
    // orderdetails: 'https://www.purchasingpower.com/store/my-account/order/all/{ORDERID}?chn=app&scn=orderdetails',

    // Production_New
    serverUrl: 'https://mobile.purchasingpower.com/purchasingpowermobileservices/service',
    storeFrontImageUrl: 'https://mobile.purchasingpower.com',
    storeFrontLoginUrl: 'https://mobile.purchasingpower.com/store/login/fast',
    storeFrontRegistrationUrl: 'https://mobile.purchasingpower.com/store/login',
    docUploadLink: 'https://odpservice01.purchasingpower.com:8443/odpservices/api/queue/upload?access_token=',
    searchURL: 'https://mobile.purchasingpower.com/store/search?text=',
    setupAllotment:'https://www.purchasingpower.com/allotment-instructions',
    viewAccountStatement: 'https://mobile.purchasingpower.com/store/my-account/account-statement',
    orderdetails: 'https://mobile.purchasingpower.com/store/my-account/order/all/{ORDERID}?chn=app&scn=orderdetails',

    safariAlertMessage: 'You are now leaving the Purchasing Power Mobile App and opening a page in Safari. Do you wish to continue?',
    safariAlertTitle: 'Purchasing Power',
    appStoreURLForAppversion: 'https://itunes.apple.com/lookup?id=934544219',
    secret: 'purchasingpower',
    newArrivalsUrl: '/store/All/-New-Arrivals/c/15_new_arrivals',
    goToBestSellers: '/store/All/-Best-Sellers/c/15_best_sellers',
    cameraOptions: {
        destinationType: 1, //file
        sourceType: 1, //camera
        encodingType: 0, //0=jpeg, 1=png. If set to png image will be rotated wrongly on android devices
        correctOrientation: true,
        targetWidth: 2560,
        targetHeight: 2048,
        quality: 20,
        mediaType: 0
    },
    mainCarouselSpeed: 3000
};
