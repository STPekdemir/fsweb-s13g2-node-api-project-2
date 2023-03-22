// posts için gerekli routerları buraya yazın
const express = require("express");
const router = express.Router();
const {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
} = require("./posts-model");

router.use(express.json());

router.get(`/`, async (req, res) => {
  try {
    const posts = await find();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findById(id);
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    }
  } catch {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});

router.post(`/`, async (req, res) => {
  const { title, contents } = req.body;
  const post = { title: title, contents: contents };
  try {
    if (post.title && post.contents) {
      const newPost = await insert(post);
      const newId = newPost.id;
      const newpostData = await findById(newId);
      res.status(201).json(newpostData);
    } else {
      res.status(400).json({
        message: "Lütfen gönderi için bir title ve contents sağlayın",
      });
    }
  } catch {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

router.put(`/:id`, async (req, res) => {
  // update(id, post)
  const { id } = req.params;
  const { title, contents } = req.body;

  try {
    const post = await findById(id);
    if (post) {
      if (contents && title) {
        const newPost = {
          title: title,
          contents: contents,
        };
        await update(id, newPost);
        const updatetedPosts = await findById(id);
        res.status(200).json(updatetedPosts);
      } else {
        res
          .status(400)
          .json({ message: "Lütfen gönderi için title ve contents sağlayın" });
      }
    } else {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    }
  } catch {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await findById(id);
    if (post) {
      await remove(id);
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    }
  } catch {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});

router.get(`/:id/comments`, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findById(id);
    if (post) {
      const comments = await findPostComments(id);
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    }
  } catch {
    res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
  }
});
module.exports = router;
