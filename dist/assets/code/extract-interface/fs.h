struct file
{
	spinlock_t                   f_lock;
	fmode_t                      f_mode;
	const struct file_operations *f_op;
	struct address_space         *f_mapping;
	void*                        private_data;
	struct inode                 *f_inode;
	unsigned int                 f_flags;
	unsigned int                 f_iocb_flags;
	const struct cred            *f_cred;
	struct fown_struct           *f_owner;
	struct path                  f_path;
	/* mais campos... */
};