const router = require("express").Router();
// req user to assign user to an announcement.
const { Announcement, User } = require("../../models");

// get all announcements
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.findAll();
        res.status(200).json(announcements);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Cannot find announcements' });
    }
});

// get more info on an announcement
router.get("/:id", async (req, res) => {
    try {
        const announcement = await Announcement.findByPk(req.params.id);

        res.status(200).json(announcement);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Cannot find this announcement" });
    }
});

//   create a new announcement
router.post("/", async (req, res) => {
    try {
        const { announcementCriteria } = req.body;
        const newAnnouncement = await Announcement.create({
            announcementCriteria: announcementCriteria,
        });

        // do we require below here?...

        //   // set session variables
        //   req.session.save(() => {
        //     // set the 'loggedIn' variable to true
        //     req.session.loggedIn = true;
        //     // set the 'user_id' variable to the 'id' of the newly created user
        //     req.session.user_id = user.id;
        //     // set the 'username' variable to the 'username' of the newly created user
        //     req.session.username = user.email;
        //   });
        res.status(200).json({ message: 'Announcement successfully created!' + newAnnouncement });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//   update announcement
router.put("/:id", async (req, res) => {
    try {
        const id = req.params;
        const { announcementCriteria } = req.body;
        const updatedRowCount = await Announcement.update(
            {announcementCriteria,
            },
            {
            where: {
                id,
            },
        },
        )
            // Check if any rows were updated
    if (updatedRowCount[0] === 0) {
        res.status(404).json({ message: "Announcement doesn't exist" });
        return;
      }
  
      // Fetch the updated job
      const updatedAnnouncement = await Announcement.findByPk(id);
      res.status(200).json({ message: 'Announcement successfully updated' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Unable to update announcement currently' });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const announcement = await Announcement.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Announcement removed" });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;