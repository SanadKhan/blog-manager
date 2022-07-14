const query = require('../db/mysql')

const getBlog = async (blog_id) => {
    try {
        let editblog = await query("SELECT * FROM blogs WHERE id=?", blog_id) 
        let title = editblog[0].title;
        let description = editblog[0].description;
        return { title, description }
    } catch (error) {
        console.log('From Blog Service ' + error)
        throw error
    }
}

module.exports = getBlog