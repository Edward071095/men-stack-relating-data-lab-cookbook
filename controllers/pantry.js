const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Routes
//GET /users/:userId/pantry
// Index route
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('pantry/index.ejs', {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

  // GET /users/:userId/pantry/new
  router.get('/new', async (req, res) => {
    res.render('pantry/new.ejs');
});

// POST /users/:userId/pantry
router.post('/', async (req, res) =>{
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.pantry.push(req.body);

    await currentUser.save();

    

    res.redirect(`/users/${currentUser._id}/pantry`);
    
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /users/:userId/pantry/:itemId

router.get('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId);
    res.render('pantry/show.ejs', {
      item: item,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/');
  }
  });

// DELETE /users/:userId/pantry/:itemId
router.delete('/:itemId', async (req, res) => {
try {
  const currentUser = await User.findById(req.session.user._id);

  currentUser.pantry.id(req.params.itemId).deleteOne();

  await currentUser.save();

  res.redirect(`/users/${currentUser._id}/pantry`);
} catch (error) {
  console.log(error)
  res.redirect('/');
}
});

// GET /users/:userId/pantry/edit
router.get('/:itemId/edit', async (req, res) => {
try {
  const currentUser = await User.findById(req.session.user._id);
  const item = currentUser.pantry.id(req.params.itemId);
  res.render('pantry/edit.ejs', {
    item: item,
  });
} catch (error) {
  console.log(error);
  res.redirect('/');
}
});

// PUT /users/:userId/pantry/:itemId
router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId);

    item.set(req.body);

    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/pantry/${req.params.itemId}`
    );
  } catch (error) {
    console.log(error)
    res.redirect('/');
  }
});






module.exports = router;
