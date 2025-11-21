const supabase = require('../utils/supabase');

const requireAuth = async (req, res, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = session.user;
  next();
};

const requireAdmin = (req, res, next) => {
  if (req.user.id !== process.env.ADMIN_USER_ID) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };