var express = require('express');
var router = express.Router();
const handler = require('../models/yadda/yaddaHandler');
const handlerTag = require('../models/tag/tagHandler');
const handlerAvatar = require('../models/avatar/avatarHandler');
const handlerReply = require('../models/reply/replyHandler');
const handlerImage = require('../models/image/imageHandler');
const handlerUser = require('../models/user/userHandler');
const auth = require('../lib/auth');
var image = require('../lib/image');

//ALl of our yaddas
router.get('/', auth.ensureAuthenticated, async function (req, res) {
  let tags = await handlerTag.readTags();
  let avatars = await handlerAvatar.readAvatar();
  let yaddas = await handler.readYaddas({}); //read all posts
  let images = await handlerImage.readImages();
  let user = await handlerUser.findUserwithId(req.session.passport.user);
  let following = user.following;
  let avatarUser = await handlerAvatar.readAvatar({ _id: user.avatarId });
  /*Find all users except the loggedin user and not activated users*/
  let usersQuery = {
    $and: [
      {
        _id: {
          $ne: req.session.passport.user,
        },
      },
      {
        _id: {
          $nin: following,
        },
      },
      {
        activated: {
          $ne: false,
        },
      },
    ],
  };
  let users = await handlerUser.findUsers(usersQuery);

  res.render('yaddas', {
    title: 'YaddaYaddaYadda',
    tags: tags,
    avatars: avatars,
    avatarUser: avatarUser[0],
    yaddas: yaddas,
    images: images,
    replies: '',
    users: users,
    loggedin: true,
    followed: false,
  });
});

router.post(
  '/',
  //Uploading our image
  image.upload.single('img'),
  //Creating and saving the yadda
  function (req, res, next) {
    handler.createYadda(req);
    //Refreshing the page to get new content
    res.redirect('/');
  }
);

/*Route for specific yadda with replies*/
router.get('/yadda', auth.ensureAuthenticated, async function (req, res, next) {
  let yadda = await handler.readYaddaWithId(req.query.id);
  var replies = await handlerReply.readRepliesByIds(yadda.replies);
  let tags = await handlerTag.readTags();
  let avatars = await handlerAvatar.readAvatar();
  let yaddas = await handler.readYaddas({}); //read all posts
  let images = await handlerImage.readImages();
  let user = await handlerUser.findUserwithId(req.session.passport.user);
  let following = user.following;
  let avatarUser = await handlerAvatar.readAvatar({ _id: user.avatarId });
  let usersQuery = {
    $and: [
      {
        _id: {
          $ne: req.session.passport.user,
        },
      },
      {
        _id: {
          $nin: following,
        },
      },
      {
        activated: {
          $ne: false,
        },
      },
    ],
  }; //find all users except the loggedin user
  let users = await handlerUser.findUsers(usersQuery);

  res.render('yaddas', {
    title: 'YaddaYaddaYadda',
    tags: tags,
    avatars: avatars,
    avatarUser: avatarUser[0],
    yaddas: yaddas,
    images: images,
    replies: replies,
    users: users,
    loggedin: true,
    followed: false,
  });
});

router.post('/:yadda', async function (req, res, next) {
  let savedReply = await handlerReply.createReply(req, res);
  let updateQuery = {
    $push: {
      replies: savedReply.id,
    },
  };
  await handler.updateYadda(req.params.yadda, updateQuery); //updating yadda with replies

  res.redirect('/');
});

//Timeline for followed users
router.get(
  '/timelineFollowed',
  auth.ensureAuthenticated,
  async function (req, res, next) {
    let user = await handlerUser.findUserwithId(req.session.passport.user);
    let following = user.following;
    let avatarUser = await handlerAvatar.readAvatar({ _id: user.avatarId });
    let tags = await handlerTag.readTags();
    let avatars = await handlerAvatar.readAvatar();
    let yaddas = await handler.readYaddas({
      createdBy: {
        $in: following,
      },
    }); //read yaddas from followed users
    let images = await handlerImage.readImages();

    /*Find all users except the loggedin user and not activated users*/
    let usersQuery = {
      $and: [
        {
          _id: {
            $ne: req.session.passport.user,
          },
        },
        {
          _id: {
            $nin: following,
          },
        },
        {
          activated: {
            $ne: false,
          },
        },
      ],
    };
    let users = await handlerUser.findUsers(usersQuery);

    res.render('yaddas', {
      title: 'YaddaYaddaYadda',
      tags: tags,
      avatars: avatars,
      avatarUser: avatarUser[0],
      yaddas: yaddas,
      images: images,
      replies: '',
      users: users,
      loggedin: true,
      followed: true,
    });
  }
);

//Timeline for specific tag
router.get('/tag', auth.ensureAuthenticated, async function (req, res, next) {
  let followTag = [req.query.tag];
  let user = await handlerUser.findUserwithId(req.session.passport.user);
  let following = user.following;
  let avatarUser = await handlerAvatar.readAvatar({ _id: user.avatarId });
  let tags = await handlerTag.readTags();
  let avatars = await handlerAvatar.readAvatar();
  let yaddas = await handler.readYaddas({
    tags: {
      $in: followTag,
    },
  }); //read yaddas from followed users
  let images = await handlerImage.readImages();

  /*Find all users except the loggedin user and not activated users*/
  let usersQuery = {
    $and: [
      {
        _id: {
          $ne: req.session.passport.user,
        },
      },
      {
        _id: {
          $nin: following,
        },
      },
      {
        activated: {
          $ne: false,
        },
      },
    ],
  };
  let users = await handlerUser.findUsers(usersQuery);

  res.render('yaddas', {
    title: 'YaddaYaddaYadda',
    tags: tags,
    avatars: avatars,
    avatarUser: avatarUser[0],
    yaddas: yaddas,
    images: images,
    replies: '',
    users: users,
    loggedin: true,
  });
});

module.exports = router;
