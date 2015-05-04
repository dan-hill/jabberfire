import Ember from 'ember';

export default Ember.Controller.extend({
  message_count: function(){
  }.property('session.currentUser.messages.length'),
  currentUser: function(){
  }.observes('session.currentUser.user_id'),
  hasMessage: function(){
    return (this.get('session.currentUser.messages.length') > 0)
  }.property('session.currentUser.messages.length')

});
