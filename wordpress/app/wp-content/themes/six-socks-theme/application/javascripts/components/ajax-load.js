import { Component } from 'yuzu'
import { TweenMax } from 'gsap'
import { Expo } from 'gsap/all';

export default class LoadMore extends Component {
  state = {
    opened: false,
  }

  listeners = {
    'click': (e) => {
      e.preventDefault();
      e.stopPropagation();

      fetch(e.target.getAttribute('href')).then(function(response) {
        return response.text();
      }).then(function(string) {
          console.log(string);
      }).catch(function(err) {
          console.log('Fetch Error', err);
      });
    }
  }

  actions = {
    opened: 'toggle',
  }

  selectors = {
  }

  ready() {
  }

  toggle(val, prev) {
  }
}

