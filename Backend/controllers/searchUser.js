const searchUsers = async (req, res) => {
    const { query } = req.query;
    const currentUserId = req.user.id;
  
    try {
      const users = await User.find({
        _id: { $ne: currentUserId },
        $or: [
          { nom: new RegExp(query, 'i') },
          { prenoms: new RegExp(query, 'i') },
          { email: new RegExp(query, 'i') }
        ]
      }).select('_id nom prenoms email role');
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la recherche', error: error.message });
    }
  };
  
  module.exports = { searchUsers };