int
fileread(struct file* f, char* addr, int n) 
{
	int r;

	if (f->readable == 0)
		return -1;
	if (f->type == FD_PIPE)
		return piperead(f->pipe, addr, n);
	if (f->type == FD_INODE)
	{
		ilock(f->ip);
		if ((r = readi(f->ip, addr, f->off, n)) > 0)
			f->off += r;
		iunlock(f->ip);
		return r;
	}
	panic("fileread");
}