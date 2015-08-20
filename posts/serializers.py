from rest_framework import serializers
from authentication.serializers import AccountSerializer
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
	#required false because we will be adding authors ourselves
    author = AccountSerializer(read_only=True, required=False) 
    class Meta:
        model = Post
        field = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields =('id', 'created_at', 'updated_at')
    
    #we are adding author to the list of exclusions we need to get 
    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self.get_validation_exclusions)

        return exclusions + ('author')