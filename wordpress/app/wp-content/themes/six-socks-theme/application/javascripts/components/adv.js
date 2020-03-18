export default function () {
  const links = document.querySelectorAll('a')

  links.forEach((link) => {
    linkToAffiliate(link.href)
  })
}

export function linkToAffiliate(link) {
  const webgains = {
    'bstn': '12887',
    'asphaltgold': '9791',
    'cpcompany': '3849',
    'stoneisland': '3848',
    '43einhalb': '10253',
    'afew': '10319',
    'allike': '10659',
    'overkill': '11073',
    'slamjam': '10279',
    'suede': '12783',
    'footdistrict': '11969',
    'presentedbyklekt': '13039',
    'sneak-a-venue': '10267',
    'sneakerstudio': '13383',
    'streetconnexion': '265615'
  }

  const rakuten = {
    'endclothing': '41198',
    'browns': '35118',
    'giuseppezanotti': '43116',
    'matchesfashion': '42412',
    'stadiumgoods': '41568',
    'timberland': '38180',
    'hm': '43251',
    'coach': '42587',
    "stockx": "43272",
    "baseblu": "44149",
    "coltorti": '43549',
    "ln-cc": '39435',
    "eastpak": '41896',
    "ssense": '41610',
    "vrients": '43861'
  }

  const horizon = {
    'adidas' : '1011lQ9M',
    'reebok' : '1011l3QvU',
  }

  const awin = {
    'nike': '16337',
    '5pointz': '5766',
    'asics': '7984',
    'asos': '9606',
    'converse': '9563',
    'diadora': '15706',
    'farfetch': '7434',
    'guess': '9872',
    'jdsports': '9690',
    'karl': '11192',
    'mrporter': '7391',
    'neweracap': '5325',
    'office': '2374',
    'ralphlauren': '9427',
    'revolutionbeauty': '7808',
    'sevenstore': '8035',
    'sizeofficial': '11259',
    'stradivarius': '9830',
    'ticketone': '9567',
    'underarmour': '9491',
  }

  var getLocation = function(href) {
    var l = document.createElement("a")
    l.href = href
    return l
  }
  
  let site_name = getLocation(link).hostname
  
  for (var value in webgains) {
    if (webgains.hasOwnProperty(value) && site_name.indexOf(value) != -1) {
      return "http://track.webgains.com/click.html?wgcampaignid=1246715&wgprogramid=" + webgains[value] + "&clickref=inArticleLinking&wgtarget=" + link
    }
  }
  
  for (var value in rakuten) {
    if (rakuten.hasOwnProperty(value) && site_name.indexOf(value) != -1) {
      return "https://click.linksynergy.com/deeplink?id=zow8CshpZF4&mid="+ rakuten[value] + "&murl=" + link
    }
  }
  
  for (var value in horizon) {
    if (horizon.hasOwnProperty(value) && site_name.indexOf(value) != -1) {
      return "https://prf.hn/click/camref:" + horizon[value] + "/destination:" + link
    }
  }
  
  for (var value in awin) {
    if (awin.hasOwnProperty(value) && site_name.indexOf(value) != -1) {
      return "https://www.awin1.com/cread.php?awinmid=" + awin[value] + "&awinaffid=499837&clickref=inArticleLinking&p=" + link
    }
  }
  
  return link
}