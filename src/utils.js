/*global chrome*/

export function turnCatOn() {
  console.log('eep oop');
  let minutes = parseFloat('0.1');
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
//  window.close();
}


export function turnCatOff() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
//  window.close();
}

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'angry_cat.jpeg',
      title:    'Your cat wants attention',
      message:  'PET ME NOW!',
      buttons: [
        {title: 'Keep it Flowing.'}
      ],
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});
