import ghpages from 'gh-pages';

ghpages.publish('dist', function (err) {
    if (err) {
        console.err(err);
    } else {
        console.log('已上传gh-pages');
    }
});
