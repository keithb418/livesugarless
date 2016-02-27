define((require) => {
    require('jquery');
    let angular = require('angular');
    let angularResource = require('angularResource');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);
    
    angular.module('blogServices', [])
        .factory('PostsService', ($resource) => {
            return $resource('data/blogposts.json');
        })
        .factory('CommentsService', ($resource) => {
            return $resource('data/blogcomments.json');
        })
        .factory('blogResources', ['$q', 'PostsService', 'CommentsService', ($q, PostsService, CommentsService) => {
            class BlogResources {
                query (resource, data) {
                    let deferred = $q.defer();
                    
                    resource.query(data).$promise.then((result) => {
                        deferred.resolve(result);
                    }, (error) => {
                        deferred.reject(error);
                    });
                    
                    return deferred.promise;
                }
                getPosts () {
                    let deferred = $q.defer();
                    
                    $q.all([
                        this.query(PostsService, {key: apiData.key, blogId: apiData.blogId}),
                        this.query(CommentsService, {key: apiData.key, blogId: apiData.blogId})
                    ], ([postsResponse, commentsResponse]) => {
                        let posts = postsResponse && postsResponse.items ? postsResponse.items : [];
                        let comments = commentsResponse && commentsResponse.items ? commentsResponse.items : [];
                        
                        comments.forEach((comment) => {
                            let post = $.grep(posts, (currPost) => {
                                return currPost.id = comment.post.id;
                            });
                            
                            post.comments = post.comments || [];
                            
                            post.comments.push(comment);
                        });
                        
                        console.log(posts);
                        
                        deferred.resolve(posts);
                    }, (error) => {
                        deferred.reject(error);
                    });
                    
                    return deferred.promise;
                }
            }
            
            return new BlogResources();
        }]);
});