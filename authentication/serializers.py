from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account

#serializer class to serialize an object to json so the js on the front can consume it
class AccountSerializer(serializers.ModelSerializer):
    #check for password, writeonly as we don't want to show the client, and not required if they don't want to change it
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    #meta data that the serializer needs to operate
    class Meta:
        model = Account
        #fields in here are always required
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
        	      'first_name', 'last_name', 'tagline', 'password',
        	      'confirm_password')
        read_only_fields = ('created_at', 'updated_at')

    #create a user from the validated data
    def create(self, validated_data):
        return Account.objects.create(**validated_data)
    
    #update the data
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.tagline = validated_data.get('tagline', instance.tagline)
        instance.save()
  
        #grab the password, if none, then none
        password = validated_data.get('password', None)
        confirm_password = validated.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(word)
            instance.save()

            #gets the session's context for the user so they are authenticated, so we use the updated_session
            update_session_auth_hash(self.context.get('request'), instance)

        return instance