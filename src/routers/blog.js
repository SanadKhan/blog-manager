const express = require('express')
const router = new express.Router()
const query = require('../db/mysql')
const getBlog = require('../services/blog')


router.get('/', async (req, res) => {

    try {
        let allblogs = await query("SELECT * from blogs")
        res.render('blog/list', { allblogs , page_title: 'All Blogs' })
    } catch (error) {
        console.log('From Blog List ' + error)
        return res.redirect('/')
    }
})


router.get('/blog/add', (req, res) => {
    res.render('blog/add', {page_title: 'Add Blog' })
})

router.post('/blog/create',   async(req, res) => {
   
    try {
        let data = {title: req.body.title, description: req.body.description}
        let blog = await query("INSERT INTO blogs SET ?", data)
        return res.redirect('/')
    } catch (error) {
        console.log('From Add Blog ' + error)
        return res.redirect('/blog/add')
    }
})

router.get('/blog/edit/:id', async (req, res) => {
    try {
        let blog_id = req.params.id
        let  {title, description } = await getBlog(blog_id)
        res.render('blog/edit', {page_title: 'Edit Blog', title, description, blog_id})
    } catch (error) {
        console.log('From Edit Blog ' + error)
        return res.redirect('/')
    }
})

router.post('/blog/update/:id',  async (req, res) => {
    
    try {
        let blog_id = req.params.id
        // console.log(req.body)
        let updateblog = await query("UPDATE blogs SET title='"+req.body.title
        +"', description='"+req.body.description+"' WHERE id=?", blog_id)
        return res.redirect('/')
    } catch (error) {
        console.log('From Update Blog ' + error)
        return res.redirect('/')
    }
})  

router.get('/blog/view/:id',  async (req, res) => {
    let blog_id = req.params.id
    let { title, description } = await getBlog(blog_id)
    res.render('blog/view', {page_title: 'Blog Details', title, description})
})

router.get('/blog/delete/:id', async (req, res) => {

    try {
        let blog_id = req.params.id
        const deletedblog = await query("DELETE FROM blogs WHERE id=?", blog_id)
        return res.redirect('/')
    } catch (e) {
        console.log('From Delete Blog ' + error)
        return res.redirect('/')
    }
})

module.exports = router