from django.contrib import admin

# Register your models here.
from .models import Tweet, TweetLike, Comment, CommentLike


class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike

class CommentLikeAdmin(admin.TabularInline):
    model = CommentLike

class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username', 'user__email']
    class Meta:
        model = Tweet

class CommentAdmin(admin.ModelAdmin):
    inlines = [CommentLikeAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username', 'user__email']
    class Meta:
        model = Comment

admin.site.register(Tweet, TweetAdmin)
admin.site.register(Comment, CommentAdmin)


