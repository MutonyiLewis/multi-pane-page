import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Button, Divider } from '@mui/material';

// Mock data for queries
const mockQueries = [
  {
    id: 1,
    title: "Login Issue",
    description: "User cannot login to the portal",
    status: "Open",
    created: "2024-10-20",
    assignedTo: "Admin",
  },
  {
    id: 2,
    title: "Password Reset",
    description: "Forgot password option not working",
    status: "In Progress",
    created: "2024-10-22",
    assignedTo: "Support",
  },
  {
    id: 3,
    title: "Account Deletion Request",
    description: "Request to delete account",
    status: "Closed",
    created: "2024-10-23",
    assignedTo: "Admin",
  },
  {
    id: 4,
    title: "Subscription Renewal",
    description: "Issue with renewing subscription",
    status: "Open",
    created: "2024-10-24",
    assignedTo: "Billing",
  },
];

// Dashboard component
const Dashboard = ({ onSelect }) => {
  const dashboardItems = ['Home', 'Queries', 'Settings', 'Profile'];
  return (
    <Box sx={{ width: '20%', borderRight: '1px solid #ccc', padding: 2 }}>
      <Typography variant="h6">Dashboard</Typography>
      <List>
        {dashboardItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => onSelect(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// Middle Pane component
const MiddlePane = ({ selectedDashboardItem, onItemSelect }) => {
  return (
    <Box sx={{ width: '40%', borderRight: '1px solid #ccc', padding: 2 }}>
      <Typography variant="h6">{selectedDashboardItem}</Typography>
      {selectedDashboardItem === 'Queries' ? (
        <List>
          {mockQueries.map((query) => (
            <ListItem key={query.id} disablePadding>
              <ListItemButton onClick={() => onItemSelect(query)}>
                <ListItemText
                  primary={query.title}
                  secondary={`Status: ${query.status} | Created: ${query.created}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Select "Queries" to view and manage queries.</Typography>
      )}
    </Box>
  );
};

// Detail Pane component
const DetailPane = ({ selectedQuery, onStatusChange, onAddQuery }) => {
  if (!selectedQuery) {
    return (
      <Box sx={{ width: '40%', padding: 2 }}>
        <Typography variant="h6">Details</Typography>
        <Typography>Select a query to see details.</Typography>
        <Button variant="outlined" color="primary" onClick={onAddQuery}>
          Add New Query
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '40%', padding: 2 }}>
      <Typography variant="h6">{selectedQuery.title}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">{selectedQuery.description}</Typography>
      <Typography variant="body2" color="text.secondary">
        Assigned To: {selectedQuery.assignedTo}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Status: {selectedQuery.status}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          onClick={() => onStatusChange(selectedQuery.id, "In Progress")}
        >
          Mark In Progress
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mr: 1 }}
          onClick={() => onStatusChange(selectedQuery.id, "Closed")}
        >
          Mark Complete
        </Button>
      </Box>
    </Box>
  );
};

// Main Home component
const Home = () => {
  const [selectedDashboardItem, setSelectedDashboardItem] = useState('Home');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queries, setQueries] = useState(mockQueries);

  const handleDashboardSelect = (item) => {
    setSelectedDashboardItem(item);
    setSelectedQuery(null); // Reset the selected query when changing dashboard items
  };

  const handleQuerySelect = (query) => {
    setSelectedQuery(query);
  };

  const handleStatusChange = (queryId, newStatus) => {
    setQueries((prevQueries) =>
      prevQueries.map((q) =>
        q.id === queryId ? { ...q, status: newStatus } : q
      )
    );
    if (selectedQuery && selectedQuery.id === queryId) {
      setSelectedQuery({ ...selectedQuery, status: newStatus });
    }
  };

  const handleAddQuery = () => {
    const newQuery = {
      id: queries.length + 1,
      title: `New Query ${queries.length + 1}`,
      description: "Description of the new query",
      status: "Open",
      created: new Date().toISOString().split('T')[0],
      assignedTo: "Support",
    };
    setQueries([...queries, newQuery]);
  };

  return (
    <Box sx={{display: 'flex', width: '80vw', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center'}} >
      <Dashboard onSelect={handleDashboardSelect} />
      <MiddlePane selectedDashboardItem={selectedDashboardItem} onItemSelect={handleQuerySelect} />
      <DetailPane selectedQuery={selectedQuery} onStatusChange={handleStatusChange} onAddQuery={handleAddQuery} />
    </Box>
  );
};

export default Home;
