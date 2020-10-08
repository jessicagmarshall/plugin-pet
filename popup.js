// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

let catIsOn = false

function turnCatOn(event) {
  console.log('eep oop');
  catIsOn = true
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
//  window.close();
}

function turnCatOff() {
  chrome.browserAction.setBadgeText({text: ''});
  catIsOff = true
  chrome.alarms.clearAll();
//  window.close();
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute increments if released
document.getElementById('toggle').addEventListener('click', turnCatOn);
// document.getElementById('cancelAlarm').addEventListener('click', turnCatOff);
