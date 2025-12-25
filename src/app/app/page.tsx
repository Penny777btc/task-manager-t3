'use client';

import {
    Box,
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Loader,
    SegmentedControl,
    TextInput,
    Transition,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { CreateTaskModal, TaskList, TaskStats } from '~/components';
import { type TaskFormData, type TaskStatus } from '~/types/task';

// SVG Icons
const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const GridIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

type FilterType = 'all' | TaskStatus;

export default function TaskAppPage() {
    const router = useRouter();
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);

    const {
        tasks,
        isLoaded,
        addTask,
        updateTaskStatus,
        deleteTask,
        getTaskStats,
    } = useLocalStorage();

    useEffect(() => {
        setMounted(true);
    }, []);

    // 过滤和搜索任务
    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        // 按状态过滤
        if (filter !== 'all') {
            result = result.filter((task) => task.status === filter);
        }

        // 按搜索关键词过滤
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((task) =>
                task.name.toLowerCase().includes(query)
            );
        }

        // 按创建时间倒序排列（最新的在上面）
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return result;
    }, [tasks, filter, searchQuery]);

    const handleAddTask = (formData: TaskFormData) => {
        addTask(formData);
    };

    const stats = getTaskStats();

    // 加载状态
    if (!isLoaded) {
        return (
            <Box
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-base)',
                }}
            >
                <Stack align="center" gap="md">
                    <Loader size="lg" color="copper" />
                    <Text c="dimmed">加载中...</Text>
                </Stack>
            </Box>
        );
    }

    return (
        <Box
            style={{
                minHeight: '100vh',
                background: 'var(--bg-base)',
            }}
        >
            {/* Header */}
            <Box
                component="header"
                className="glass-bg"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    borderBottom: '1px solid var(--border-light)',
                }}
            >
                <Container size="xl">
                    <Group justify="space-between" h={80}>
                        <Group gap="lg">
                            <Group
                                gap="sm"
                                style={{ cursor: 'pointer' }}
                                onClick={() => router.push('/')}
                            >
                                <Box
                                    style={{
                                        width: 40,
                                        height: 40,
                                        background: 'var(--primary)',
                                        borderRadius: 4,
                                        boxShadow: '0 0 20px var(--primary-glow)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <GridIcon />
                                </Box>
                                <Text fw={900} size="xl" style={{ letterSpacing: '-0.02em' }}>
                                    TASKFLOW
                                </Text>
                            </Group>
                            <Text
                                c="dimmed"
                                size="sm"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                }}
                                visibleFrom="sm"
                            >
                                / APP
                            </Text>
                        </Group>

                        <Group gap="md">
                            <Button
                                variant="subtle"
                                color="gray"
                                leftSection={<HomeIcon />}
                                onClick={() => router.push('/')}
                                visibleFrom="sm"
                            >
                                首页
                            </Button>
                            <Button
                                color="copper"
                                className="btn-3d"
                                leftSection={<PlusIcon />}
                                onClick={openModal}
                            >
                                新建任务
                            </Button>
                        </Group>
                    </Group>
                </Container>
            </Box>

            {/* Main Content */}
            <Container size="xl" py="xl">
                <Transition
                    mounted={mounted}
                    transition="fade"
                    duration={400}
                    timingFunction="ease"
                >
                    {(styles) => (
                        <Stack gap="xl" style={styles}>
                            {/* Page Title */}
                            <Stack gap="xs">
                                <Title order={1} className="section-title">
                                    任务管理
                                </Title>
                                <Text c="dimmed">
                                    管理您的日常任务，追踪进度，提升效率
                                </Text>
                            </Stack>

                            {/* Stats Section */}
                            <TaskStats stats={stats} />

                            {/* Filters and Search */}
                            <Group justify="space-between" wrap="wrap" gap="md">
                                <SegmentedControl
                                    value={filter}
                                    onChange={(value) => setFilter(value as FilterType)}
                                    data={[
                                        { label: '全部', value: 'all' },
                                        { label: '待处理', value: 'pending' },
                                        { label: '进行中', value: 'in-progress' },
                                        { label: '已完成', value: 'completed' },
                                    ]}
                                    styles={{
                                        root: {
                                            backgroundColor: 'var(--bg-surface)',
                                            border: '1px solid var(--border-light)',
                                        },
                                    }}
                                />

                                <TextInput
                                    placeholder="搜索任务..."
                                    leftSection={<SearchIcon />}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ minWidth: 250 }}
                                    styles={{
                                        input: {
                                            backgroundColor: 'var(--bg-elevated)',
                                        },
                                    }}
                                />
                            </Group>

                            {/* Task List */}
                            <Box>
                                <TaskList
                                    tasks={filteredTasks}
                                    onUpdateStatus={updateTaskStatus}
                                    onDeleteTask={deleteTask}
                                />

                                {/* Empty search result */}
                                {filteredTasks.length === 0 && tasks.length > 0 && (
                                    <Box ta="center" py="xl">
                                        <Text c="dimmed">没有找到匹配的任务</Text>
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    )}
                </Transition>
            </Container>

            {/* Create Task Modal */}
            <CreateTaskModal
                opened={modalOpened}
                onClose={closeModal}
                onSubmit={handleAddTask}
            />
        </Box>
    );
}
