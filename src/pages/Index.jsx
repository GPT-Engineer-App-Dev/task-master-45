import { useState } from 'react';
import { Box, Button, Container, Input, List, ListItem, IconButton, Text, VStack, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const handleSaveTask = (id, newText) => {
    if (newText.trim() === '') {
      toast({
        title: 'Cannot save empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Box display="flex" width="100%">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <IconButton
            aria-label="Add task"
            icon={<FaPlus />}
            onClick={handleAddTask}
            ml={2}
          />
        </Box>
        <List width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              {task.isEditing ? (
                <Input
                  defaultValue={task.text}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveTask(task.id, e.target.value)}
                />
              ) : (
                <Text>{task.text}</Text>
              )}
              <Box>
                {task.isEditing ? (
                  <IconButton
                    aria-label="Save task"
                    icon={<FaSave />}
                    onClick={() => handleSaveTask(task.id, document.querySelector(`input[defaultValue="${task.text}"]`).value)}
                    ml={2}
                  />
                ) : (
                  <IconButton
                    aria-label="Edit task"
                    icon={<FaEdit />}
                    onClick={() => handleEditTask(task.id)}
                    ml={2}
                  />
                )}
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  ml={2}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;