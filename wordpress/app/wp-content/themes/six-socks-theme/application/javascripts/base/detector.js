const BrowserDetect = {
    init() {
        this.browser = this.searchString(this.dataBrowser) || 'An unknown browser'
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version'
        this.OS = this.searchString(this.dataOS) || 'an unknown OS'
    },

    searchString(data) {
        for (let i = 0; i < data.length; i += 1) {
            const dataString = data[i].string
            const dataProp = data[i].prop
            this.versionSearchString = data[i].versionSearch || data[i].identity

            if (dataString) {
                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity
                }
            } else if (dataProp) {
                return data[i].identity
            }
        }
    },

    searchVersion(dataString) {
        const index = dataString.indexOf(this.versionSearchString)
        if (index === -1) {
            return
        }

        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
    },

    dataBrowser: [{
        string: navigator.userAgent,
        subString: 'Chrome',
        identity: 'Chrome'
    }, {
        string: navigator.vendor,
        subString: 'Apple',
        identity: 'Safari',
        versionSearch: 'Version'
    }, {
        prop: window.opera,
        identity: 'Opera',
        versionSearch: 'Version'
    }, {
        string: navigator.userAgent,
        subString: 'Firefox',
        identity: 'Firefox'
    }, {
        string: navigator.userAgent,
        subString: 'MSIE',
        identity: 'Explorer',
        versionSearch: 'MSIE'
    }, {
        string: navigator.userAgent,
        subString: 'Gecko',
        identity: 'Mozilla',
        versionSearch: 'rv'
    }, { // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: 'Mozilla',
        identity: 'Netscape',
        versionSearch: 'Mozilla'
    }],
    dataOS: [{
        string: navigator.platform,
        subString: 'Win',
        identity: 'Windows'
    }, {
        string: navigator.platform,
        subString: 'Mac',
        identity: 'Mac'
    }, {
        string: navigator.userAgent,
        subString: 'iPhone',
        identity: 'iPhone/iPod'
    }, {
        string: navigator.platform,
        subString: 'Linux',
        identity: 'Linux'
    }]
}

export default BrowserDetect

///// mobile
const isMobile = {
    Android() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
    }
}