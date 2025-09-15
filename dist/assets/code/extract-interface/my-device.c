// 1. Implementar as operações da interface
static ssize_t
my_device_read(struct file *filp, char __user *buf,
               size_t count, loff_t *f_pos)
{
  	/* Lógica específica do dispositivo - que, inclusive, não precisa ser escrita em C */
	return bytes_read;
}

// 2. Definir a estrutura file_operations
static const struct file_operations meu_fops = 
{
	.owner   = THIS_MODULE,
	.read    = my_device_read,
	.write   = my_device_write,
	.open    = my_device_open,
	.release = my_device_release,
};

// 3. Registrar o dispositivo (em tempo de execução!)
misc_register(&my_device);