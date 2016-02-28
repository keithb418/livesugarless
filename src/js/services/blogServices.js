define((require) => {
    let moment = require('moment');
    let angular = require('angular');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);
    
    angular.module('blogServices', [])
        .factory('blogResources', ['$q', '$http', ($q, $http, PostsService, CommentsService) => {
            class BlogResources {
                sortCommentsInPosts (posts) {
                    posts.forEach((post) => {
                        post.comments.sort((a, b) => {
                            let aDate = moment(a.published);
                            let bDate = moment(b.published);
                            
                            if (aDate > bDate) {
                                return -1;
                            }
                            
                            if (bDate > aDate) {
                                return 1;
                            }
                            
                            return 0;
                        });
                    });
                    
                    return posts;
                }
                matchCommentsAndPosts (posts, comments) {
                    let postsMap = new Map();
                    
                    posts.forEach((post) => {
                        postsMap.set(post.id, post);
                    });
                    
                    comments.forEach((comment) => {
                        let id = comment.post.id;
                        let post = postsMap.get(id);
                        
                        post.comments = post.comments || [];
                        
                        post.comments.push(comment);
                        
                        postsMap.set(id, post);
                    });
                    
                    return this.sortCommentsInPosts(Array.from(postsMap.values()));
                }
                getPosts () {
                    let deferred = $q.defer();
                    
                    $q.all([
                        $http.get(`data/blogposts.json?key=${apiData.key}&blogId=${apiData.blogId}`),
                        $http.get(`data/blogcomments.json?key=${apiData.key}&blogId=${apiData.blogId}`)
                    ]).then(([postsResponse, commentsResponse]) => {
                        let postsData = postsResponse ? postsResponse.data : {};
                        let commentsData = commentsResponse ? commentsResponse.data : {};
                        let posts = postsData.items || [];
                        let comments = commentsData.items || [];
                        
                        deferred.resolve(this.matchCommentsAndPosts(posts, comments));
                    });
                    
                    return deferred.promise;
                }
            }
            
            return new BlogResources();
        }]);
});