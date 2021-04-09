const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../lib/auth");

const User = require("../database/models/User");
const Link = require("../database/models/Link");
require("../database/associations");

router.get("/add", isLoggedIn, (req, res) => {
    res.render("links/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    await Link.create({ 
        title, 
        url, 
        description, 
        id_user: req.user.id_user 
    });
    req.flash("success", "Link saved successfully");
    res.redirect("/links");
});

router.get("/", isLoggedIn, async (req, res) => {
    const links = await Link.findAll({
        include: [{
            model: User,
            as: "user",
            association: "user",
            attributes: ["id_user"],
            where: {
                id_user: req.user.id_user
            },
        }],
        attributes: ["id_link", "title", "url", "description", "created_at", "id_user"],
        as: "links"
    });
    res.render("links/list", { links });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Link.destroy({
        where: {
            id_link: id
        }
    });
    res.redirect("/links");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const link = await Link.findOne({
        where: {
            id_link: id
        }, 
        include: [{
            model: User,
            as: "user",
            association: "user",
            attributes: ["id_user"],
            where: {
                id_user: req.user.id_user
            },
        }],
        attributes: ["id_link", "title", "url", "description", "created_at", "id_user"],
        as: "links"
    });
    if (link != null) {
        res.render("links/edit", { link: link });
    } else {
        res.redirect("/links");
    }
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    await Link.update({
        title,
        url,
        description
    }, {
        where: {
            id_link: id
        }
    });
    req.flash("success", "Link updated successfully");
    res.redirect("/links");
});

module.exports = router;