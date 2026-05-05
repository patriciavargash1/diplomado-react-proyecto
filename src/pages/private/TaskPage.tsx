import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Chip,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Edit, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useAxios } from '../../hooks/useAxios';
import { useAlert } from '../../hooks/useAlert';
import type { Task, UpdateTask, TaskFormValues } from '../../models/task.model';
import { schemaTask } from '../../models/task.model';
import { z } from 'zod';

export const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState<UpdateTask>({});
  const [createForm, setCreateForm] = useState<TaskFormValues>({ name: '' });
  const [creating, setCreating] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const axios = useAxios();
  const { showAlert } = useAlert();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      showAlert('Error al cargar tareas', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      schemaTask.parse(createForm);
      const response = await axios.post('/tasks', {
        name: createForm.name.trim(),
      });
      setTasks([...tasks, response.data]);
      showAlert('Tarea creada', 'success');
      setCreateDialogOpen(false);
      setCreateForm({ name: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        showAlert('Por favor corrige los errores en el formulario', 'error');
      } else {
        showAlert('Error al crear tarea', 'error');
      }
    } finally {
      setCreating(false);
    }
  };

  const handleToggleDone = async (task: Task) => {
    try {
      await axios.patch(`/tasks/${task.id}`, { done: !task.done });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
      showAlert('Tarea actualizada', 'success');
    } catch (error) {
      showAlert('Error al actualizar tarea', 'error');
    }
  };

  const handleDelete = async (task: Task) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      await axios.delete(`/tasks/${task.id}`);
      setTasks(tasks.filter(t => t.id !== task.id));
      showAlert('Tarea eliminada', 'success');
    } catch (error) {
      showAlert('Error al eliminar tarea', 'error');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditForm({ name: task.name, done: task.done });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    try {
      await axios.put(`/tasks/${editingTask.id}`, editForm);
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...editForm } : t));
      setEditDialogOpen(false);
      setEditingTask(null);
      showAlert('Tarea actualizada', 'success');
    } catch (error) {
      showAlert('Error al actualizar tarea', 'error');
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 400 },
    {
      field: 'done',
      headerName: 'Estado',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value ? 'Finalizada' : 'Pendiente'}
          color={params.value ? 'success' : 'warning'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleToggleDone(params.row)}>
            {params.row.done ? <CheckCircle color="success" /> : <RadioButtonUnchecked />}
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography component="h1" variant="h4">
          MIS TAREAS
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setCreateForm({ name: '' });
            setCreateDialogOpen(true);
          }}
        >
          Crear Nueva Tarea
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10]}
        />
      </Box>

      {/* Modal para crear nueva tarea */}
      <Dialog open={createDialogOpen} onClose={() => {
        setCreateDialogOpen(false);
        setCreateForm({ name: '' });
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Nueva Tarea</DialogTitle>
        <Box component="form" onSubmit={handleCreateTask} sx={{ width: '100%' }}>
          <DialogContent>
            <TextField
              label="Nombre de la tarea"
              name="name"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              disabled={creating}
              value={createForm.name}
              onChange={(e) => setCreateForm({ name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)} disabled={creating}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={creating}
              variant="contained"
              startIcon={
                creating ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {creating ? 'Creando...' : 'Crear'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Modal para editar tarea */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la tarea"
            fullWidth
            variant="standard"
            value={editForm.name || ''}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};