const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

// ListItem Component
function ListItem({ item, onUpdate, onDelete, isSelected, onToggleSelect, draggedItem, onDragStart, onDragEnter, onDragEnd, isDragging }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(item.name);
  const [text, setText] = useState(item.text);
  const [isFocused, setIsFocused] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  const handleNameSubmit = () => {
    setIsEditingName(false);
    onUpdate(item.id, { name, text });
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onUpdate(item.id, { name, text: newText });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  const handleCopyName = () => {
    navigator.clipboard.writeText(name).then(() => {
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2000);
    });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id.toString());
    onDragStart(item.id);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== item.id) {
      onDragEnter(item.id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return React.createElement(
    'div',
    {
      className: `list-item ${isDragging ? 'dragging' : ''}`,
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDrop: handleDrop
    },
    React.createElement('input', {
      type: 'checkbox',
      className: 'select-checkbox',
      checked: isSelected,
      onChange: () => onToggleSelect(item.id),
      title: 'Select for bulk delete',
      draggable: false
    }),
    React.createElement(
      'span',
      {
        className: 'drag-handle',
        title: 'Drag to reorder',
        draggable: true,
        onDragStart: handleDragStart,
        onDragEnd: onDragEnd
      },
      '⋮⋮'
    ),
    React.createElement(
      'button',
      {
        className: `copy-name-btn ${copiedName ? 'copied' : ''}`,
        onClick: handleCopyName,
        title: 'Copy text'
      },
      copiedName ? '✓' : '📋'
    ),
    isEditingName
      ? React.createElement('input', {
          type: 'text',
          className: 'name-input',
          value: name,
          onChange: (e) => setName(e.target.value),
          onBlur: handleNameSubmit,
          onKeyPress: (e) => e.key === 'Enter' && handleNameSubmit(),
          autoFocus: true
        })
      : React.createElement(
          'div',
          {
            className: 'item-name',
            onClick: () => setIsEditingName(true),
            title: 'Click to edit'
          },
          name
        ),
    React.createElement('input', {
      type: isFocused ? 'text' : 'password',
      className: 'text-field',
      value: text,
      onChange: handleTextChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      placeholder: 'Enter text...'
    }),
    React.createElement(
      'button',
      {
        className: `copy-btn ${copiedText ? 'copied' : ''}`,
        onClick: handleCopyText,
        title: 'Copy text'
      },
      copiedText ? '✓' : '📋'
    ),
    React.createElement(
      'button',
      {
        className: 'delete-btn',
        onClick: () => onDelete(item.id),
        title: 'Delete item'
      },
      '×'
    )
  );
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsData, setTabsData] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  });
  const [tabNames, setTabNames] = useState({
    1: 'Tab 1',
    2: 'Tab 2',
    3: 'Tab 3',
    4: 'Tab 4',
    5: 'Tab 5'
  });
  const [editingTab, setEditingTab] = useState(null);
  const [tempTabName, setTempTabName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [draggedTab, setDraggedTab] = useState(null);
  const [tabOrder, setTabOrder] = useState([1, 2, 3, 4, 5]);

  // Load all data from localStorage on mount
  useEffect(() => {
    try {
      console.log('Loading data from localStorage...');
      const savedTabsData = localStorage.getItem('copierTabsData');
      const savedActiveTab = localStorage.getItem('copierActiveTab');
      const savedTabNames = localStorage.getItem('copierTabNames');
      const savedTheme = localStorage.getItem('copierTheme');
      const savedTabOrder = localStorage.getItem('copierTabOrder');

      console.log('Saved tab names:', savedTabNames);

      // Always ensure tabNames has default values
      const defaultTabNames = {
        1: 'Tab 1',
        2: 'Tab 2',
        3: 'Tab 3',
        4: 'Tab 4',
        5: 'Tab 5'
      };

      if (savedTabsData) {
        const parsed = JSON.parse(savedTabsData);
        // Validate the data structure
        if (parsed && typeof parsed === 'object') {
          setTabsData(parsed);
        }
      } else {
        // Add a sample item for first-time users in Tab 1
        const sampleItem = {
          id: Date.now(),
          name: 'Sample Item',
          text: 'Click to edit the name, type here and use copy button'
        };
        setTabsData({
          1: [sampleItem],
          2: [],
          3: [],
          4: [],
          5: []
        });
      }

      if (savedActiveTab) {
        setActiveTab(parseInt(savedActiveTab));
      }

      if (savedTabNames) {
        try {
          const parsed = JSON.parse(savedTabNames);
          if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
            console.log('Using saved tab names:', parsed);
            setTabNames(parsed);
          } else {
            console.log('Invalid saved tab names, using defaults');
            setTabNames(defaultTabNames);
          }
        } catch (e) {
          console.error('Error parsing tab names:', e);
          setTabNames(defaultTabNames);
        }
      } else {
        console.log('No saved tab names, using defaults');
        setTabNames(defaultTabNames);
      }

      if (savedTheme) {
        setTheme(savedTheme);
        document.body.className = savedTheme;
      } else {
        document.body.className = 'dark';
      }

      if (savedTabOrder) {
        try {
          const parsed = JSON.parse(savedTabOrder);
          if (Array.isArray(parsed) && parsed.length === 5) {
            setTabOrder(parsed);
          }
        } catch (e) {
          console.error('Error parsing tab order:', e);
        }
      }

      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Clear ALL localStorage data
      localStorage.clear();
      // Reload to start fresh
      window.location.reload();
    }
  }, []);

  // Save tabs data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('copierTabsData', JSON.stringify(tabsData));
  }, [tabsData]);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('copierActiveTab', activeTab.toString());
  }, [activeTab]);

  // Save tab names to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('copierTabNames', JSON.stringify(tabNames));
  }, [tabNames]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('copierTheme', theme);
    document.body.className = theme;
  }, [theme]);

  // Save tab order to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('copierTabOrder', JSON.stringify(tabOrder));
  }, [tabOrder]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'New Item',
      text: ''
    };
    setTabsData({
      ...tabsData,
      [activeTab]: [...tabsData[activeTab], newItem]
    });
  };

  const updateItem = (id, updates) => {
    setTabsData({
      ...tabsData,
      [activeTab]: tabsData[activeTab].map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const deleteItem = (id) => {
    setTabsData({
      ...tabsData,
      [activeTab]: tabsData[activeTab].filter(item => item.id !== id)
    });
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const handleTabDoubleClick = (tabNum) => {
    setEditingTab(tabNum);
    setTempTabName(tabNames[tabNum]);
  };

  const handleTabNameChange = (e) => {
    setTempTabName(e.target.value);
  };

  const handleTabNameSubmit = () => {
    if (tempTabName.trim() !== '') {
      setTabNames({
        ...tabNames,
        [editingTab]: tempTabName.trim()
      });
    }
    setEditingTab(null);
    setTempTabName('');
  };

  const handleTabNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTabNameSubmit();
    } else if (e.key === 'Escape') {
      setEditingTab(null);
      setTempTabName('');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectAll = () => {
    const currentItems = tabsData[activeTab] || [];
    setSelectedItems(currentItems.map(item => item.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const deleteSelected = () => {
    if (selectedItems.length === 0) return;

    const confirmed = confirm(`Delete ${selectedItems.length} selected item(s)?`);
    if (confirmed) {
      setTabsData({
        ...tabsData,
        [activeTab]: tabsData[activeTab].filter(item => !selectedItems.includes(item.id))
      });
      setSelectedItems([]);
    }
  };

  const handleTabDragStart = (tabNum) => {
    setDraggedTab(tabNum);
  };

  const handleTabDragOver = (e, targetTabNum) => {
    e.preventDefault();
    if (draggedTab === null || draggedTab === targetTabNum) return;

    const newOrder = [...tabOrder];
    const draggedIndex = newOrder.indexOf(draggedTab);
    const targetIndex = newOrder.indexOf(targetTabNum);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedTab);

    setTabOrder(newOrder);
  };

  const handleTabDragEnd = () => {
    setDraggedTab(null);
  };

  const exportToCSV = async () => {
    let csvContent = 'Tab,Name,Text\n';

    Object.keys(tabsData).forEach(tabNum => {
      const tabName = tabNames[tabNum] || `Tab ${tabNum}`;
      tabsData[tabNum].forEach(item => {
        const escapedName = `"${item.name.replace(/"/g, '""')}"`;
        const escapedText = `"${item.text.replace(/"/g, '""')}"`;
        csvContent += `"${tabName}",${escapedName},${escapedText}\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Check if we're in a browser that supports the File System Access API
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: `text-copier-backup-${new Date().toISOString().slice(0, 10)}.csv`,
          types: [{
            description: 'CSV Files',
            accept: { 'text/csv': ['.csv'] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (err) {
        // User cancelled or error occurred
        if (err.name !== 'AbortError') {
          console.error('Error saving file:', err);
        }
      }
    } else {
      // Fallback for browsers that don't support File System Access API
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `text-copier-backup-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const importFromCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csv = event.target.result;
          const lines = csv.split(/\r?\n/);
          const newTabsData = { 1: [], 2: [], 3: [], 4: [], 5: [] };
          const newTabNames = { 1: 'Tab 1', 2: 'Tab 2', 3: 'Tab 3', 4: 'Tab 4', 5: 'Tab 5' };
          const tabMapping = {}; // Maps CSV tab names to tab numbers
          let nextAvailableTab = 1;
          let itemCounter = 0;

          // Skip header line and process data
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Parse CSV line - handle quoted fields with commas
            const fields = [];
            let currentField = '';
            let insideQuotes = false;

            for (let j = 0; j < line.length; j++) {
              const char = line[j];
              const nextChar = line[j + 1];

              if (char === '"' && insideQuotes && nextChar === '"') {
                // Escaped quote
                currentField += '"';
                j++; // Skip next quote
              } else if (char === '"') {
                // Toggle quote state
                insideQuotes = !insideQuotes;
              } else if (char === ',' && !insideQuotes) {
                // Field separator
                fields.push(currentField);
                currentField = '';
              } else {
                currentField += char;
              }
            }
            fields.push(currentField); // Add last field

            if (fields.length !== 3) {
              console.log('Skipping invalid line:', line);
              continue;
            }

            const [tabName, name, text] = fields;

            // Find or assign tab number for this tab name
            let tabNum = tabMapping[tabName];
            if (!tabNum && nextAvailableTab <= 5) {
              tabNum = nextAvailableTab;
              tabMapping[tabName] = tabNum;
              newTabNames[tabNum] = tabName;
              nextAvailableTab++;
            }

            if (tabNum && tabNum <= 5) {
              newTabsData[tabNum].push({
                id: Date.now() + (itemCounter++ * 1000), // Ensure unique IDs with larger spacing
                name: name,
                text: text
              });
            }
          }

          const itemCount = Object.values(newTabsData).reduce((sum, items) => sum + items.length, 0);

          if (itemCount === 0) {
            alert('No valid data found in CSV file.');
            return;
          }

          const confirmed = confirm(`Import ${itemCount} item(s)? This will replace all current data.`);
          if (confirmed) {
            setTabsData(newTabsData);
            setTabNames(newTabNames);
          }
        } catch (error) {
          console.error('Import error:', error);
          alert('Error importing CSV file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Improved drag and drop handlers
  const handleDragStart = (itemId) => {
    setDraggedItem(itemId);
  };

  const handleDragEnter = (targetItemId) => {
    if (!draggedItem || draggedItem === targetItemId) return;

    const currentItems = [...tabsData[activeTab]];
    const draggedIndex = currentItems.findIndex(item => item.id === draggedItem);
    const targetIndex = currentItems.findIndex(item => item.id === targetItemId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove dragged item
    const [removed] = currentItems.splice(draggedIndex, 1);
    // Insert at target position
    currentItems.splice(targetIndex, 0, removed);

    setTabsData({
      ...tabsData,
      [activeTab]: currentItems
    });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleContainerDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleContainerDrop = (e) => {
    e.preventDefault();
    setDraggedItem(null);
  };

  const currentItems = tabsData[activeTab] || [];
  const hasSelectedItems = selectedItems.length > 0;

  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement(
      'header',
      { className: 'app-header' },
      React.createElement('h1', null, 'Text Copier'),
      React.createElement(
        'div',
        { className: 'header-actions' },
        React.createElement(
          'button',
          {
            className: 'import-btn',
            onClick: importFromCSV,
            title: 'Import from CSV'
          },
          React.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '18',
              height: '18',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            },
            React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
            React.createElement('polyline', { points: '7 10 12 15 17 10' }),
            React.createElement('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
          ),
          React.createElement('span', null, 'Import')
        ),
        React.createElement(
          'button',
          {
            className: 'export-btn',
            onClick: exportToCSV,
            title: 'Export to CSV'
          },
          React.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '18',
              height: '18',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            },
            React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
            React.createElement('polyline', { points: '17 8 12 3 7 8' }),
            React.createElement('line', { x1: '12', y1: '3', x2: '12', y2: '15' })
          ),
          React.createElement('span', null, 'Export')
        ),
        React.createElement(
          'button',
          {
            className: 'theme-toggle',
            onClick: toggleTheme,
            title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
          },
          theme === 'dark' ? '☀️' : '🌙'
        ),
        React.createElement(
          'button',
          { className: 'add-btn', onClick: addItem },
          '+ Add Item'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'tabs-container' },
      React.createElement(
        'div',
        { className: 'tabs' },
        tabOrder.map(tabNum =>
          editingTab === tabNum
            ? React.createElement('input', {
                key: tabNum,
                type: 'text',
                className: 'tab-input',
                value: tempTabName,
                onChange: handleTabNameChange,
                onBlur: handleTabNameSubmit,
                onKeyDown: handleTabNameKeyPress,
                autoFocus: true
              })
            : React.createElement(
                'div',
                {
                  key: tabNum,
                  className: `tab ${activeTab === tabNum ? 'active' : ''} ${draggedTab === tabNum ? 'dragging' : ''}`,
                  onClick: () => setActiveTab(tabNum),
                  onDoubleClick: () => handleTabDoubleClick(tabNum),
                  title: 'Click to switch, double-click to edit, drag to reorder',
                  draggable: true,
                  onDragStart: () => handleTabDragStart(tabNum),
                  onDragOver: (e) => handleTabDragOver(e, tabNum),
                  onDragEnd: handleTabDragEnd
                },
                tabNames[tabNum] || `Tab ${tabNum}`
              )
        )
      )
    ),
    hasSelectedItems && React.createElement(
      'div',
      { className: 'bulk-actions' },
      React.createElement('span', { className: 'selection-count' }, `${selectedItems.length} selected`),
      React.createElement(
        'button',
        { className: 'bulk-action-btn', onClick: selectAll },
        'Select All'
      ),
      React.createElement(
        'button',
        { className: 'bulk-action-btn', onClick: deselectAll },
        'Deselect All'
      ),
      React.createElement(
        'button',
        { className: 'bulk-delete-btn', onClick: deleteSelected },
        `Delete Selected (${selectedItems.length})`
      )
    ),
    React.createElement(
      'div',
      {
        className: 'items-container',
        onDragOver: handleContainerDragOver,
        onDrop: handleContainerDrop
      },
      currentItems.length === 0
        ? React.createElement(
            'div',
            { className: 'empty-state' },
            React.createElement('p', null, 'No items yet. Click "Add Item" to get started!')
          )
        : currentItems.map(item =>
            React.createElement(ListItem, {
              key: item.id,
              item: item,
              onUpdate: updateItem,
              onDelete: deleteItem,
              isSelected: selectedItems.includes(item.id),
              onToggleSelect: toggleSelectItem,
              draggedItem: draggedItem,
              onDragStart: handleDragStart,
              onDragEnter: handleDragEnter,
              onDragEnd: handleDragEnd,
              isDragging: draggedItem === item.id
            })
          )
    )
  );
}

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
