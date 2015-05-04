import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['btn-group'],
  didInsertElement: function() {
    var role = this.get('role');
    var button = this.$().find('button');


    if(role == 'user'){
      button.removeClass('blue-madison').removeClass('blue-hoki').addClass('blue-steel');
    }

    if(role == 'technician'){
      button.removeClass('blue-hoki').removeClass('blue-steel').addClass('blue-madison');
    }

    if(role == 'administrator'){
      button.removeClass('blue-steel').removeClass('blue-madison').addClass('blue-hoki');
    }
  },
  actions: {
    changeRole: function (role) {
      this.sendAction('action', role, this.get('user_id'));
      var button = this.$().find('button')

      if(role == 'user'){
        button.removeClass('blue-madison').removeClass('blue-hoki').addClass('blue-steel');
      }

      if(role == 'technician'){
        button.removeClass('blue-hoki').removeClass('blue-steel').addClass('blue-madison');
      }

      if(role == 'administrator'){
        button.removeClass('blue-steel').removeClass('blue-madison').addClass('blue-hoki');
      }
    }
  }
});
