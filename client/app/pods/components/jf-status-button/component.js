import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['btn-group'],
  didInsertElement: function() {
    var status = this.get('status');
    var button = this.$().find('button');


    if(status == 'pending'){
      button.removeClass('green-jungle').removeClass('grey-gallery').addClass('yellow-lemon');
    }

    if(status == 'active'){
      button.removeClass('yellow-lemon').removeClass('grey-gallery').addClass('green-jungle');
    }

    if(status == 'inactive'){
      button.removeClass('green-jungle').removeClass('yellow-lemon').addClass('grey-gallery');
    }
  },
  actions: {
    changeStatus: function (status) {
      this.sendAction('action', status, this.get('user_id'));
      var button = this.$().find('button')

      if(status == 'pending'){
        button.removeClass('green-jungle').removeClass('grey-gallery').addClass('yellow-lemon');
      }

      if(status == 'active'){
        button.removeClass('yellow-lemon').removeClass('grey-gallery').addClass('green-jungle');
      }

      if(status == 'inactive'){
        button.removeClass('green-jungle').removeClass('yellow-lemon').addClass('grey-gallery');
      }
    }
  }
});
