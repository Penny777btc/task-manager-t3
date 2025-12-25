'use client';

import {
    Table,
    Badge,
    ActionIcon,
    Group,
    Text,
    Menu,
    Box,
    Tooltip,
    Stack,
    Card,
} from '@mantine/core';
import { type Task, type TaskStatus } from '~/types/task';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

// SVG Icons
const MoreIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const PlayIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

interface TaskListProps {
    tasks: Task[];
    onUpdateStatus: (taskId: string, status: TaskStatus) => void;
    onDeleteTask: (taskId: string) => void;
}

const getStatusBadge = (status: TaskStatus) => {
    const config = {
        pending: { color: 'yellow', label: '待处理' },
        'in-progress': { color: 'blue', label: '进行中' },
        completed: { color: 'green', label: '已完成' },
    };

    const { color, label } = config[status];
    return (
        <Badge variant="light" color={color} size="sm">
            {label}
        </Badge>
    );
};

const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return <Text c="dimmed" size="sm">未设置</Text>;

    const date = dayjs(dueDate);
    const now = dayjs();
    const isOverdue = date.isBefore(now, 'day');
    const isToday = date.isSame(now, 'day');
    const isTomorrow = date.isSame(now.add(1, 'day'), 'day');

    let displayText = date.format('YYYY/MM/DD');
    let textColor = 'dimmed';

    if (isOverdue) {
        textColor = 'red';
        displayText = `已逾期 ${date.fromNow()}`;
    } else if (isToday) {
        textColor = 'yellow';
        displayText = '今天';
    } else if (isTomorrow) {
        textColor = 'orange';
        displayText = '明天';
    }

    return (
        <Group gap="xs">
            <ClockIcon />
            <Text size="sm" c={textColor}>
                {displayText}
            </Text>
        </Group>
    );
};

// Desktop Table View
function TaskTable({ tasks, onUpdateStatus, onDeleteTask }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <Card padding="xl" ta="center">
                <Stack align="center" gap="md">
                    <Box
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'var(--bg-elevated)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="1.5">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                    </Box>
                    <Text c="dimmed" size="lg">暂无任务</Text>
                    <Text c="dimmed" size="sm">点击上方按钮创建您的第一个任务</Text>
                </Stack>
            </Card>
        );
    }

    return (
        <Table.ScrollContainer minWidth={600}>
            <Table
                striped
                highlightOnHover
                verticalSpacing="md"
                styles={{
                    table: {
                        borderRadius: 'var(--mantine-radius-md)',
                        overflow: 'hidden',
                    },
                }}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ width: '40%' }}>任务名称</Table.Th>
                        <Table.Th style={{ width: '25%' }}>截止日期</Table.Th>
                        <Table.Th style={{ width: '20%' }}>状态</Table.Th>
                        <Table.Th style={{ width: '15%', textAlign: 'right' }}>操作</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {tasks.map((task) => (
                        <Table.Tr
                            key={task.id}
                            style={{
                                opacity: task.status === 'completed' ? 0.7 : 1,
                            }}
                        >
                            <Table.Td>
                                <Text
                                    fw={600}
                                    size="sm"
                                    style={{
                                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                    }}
                                >
                                    {task.name}
                                </Text>
                            </Table.Td>
                            <Table.Td>{formatDueDate(task.dueDate)}</Table.Td>
                            <Table.Td>{getStatusBadge(task.status)}</Table.Td>
                            <Table.Td>
                                <Group gap="xs" justify="flex-end">
                                    <Menu shadow="lg" position="bottom-end" withinPortal>
                                        <Menu.Target>
                                            <Tooltip label="更多操作" position="top">
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="gray"
                                                    size="lg"
                                                >
                                                    <MoreIcon />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Menu.Target>
                                        <Menu.Dropdown
                                            style={{
                                                backgroundColor: 'var(--mantine-color-dark-7)',
                                                border: '1px solid var(--mantine-color-dark-4)',
                                            }}
                                        >
                                            <Menu.Label>更改状态</Menu.Label>
                                            {task.status !== 'pending' && (
                                                <Menu.Item
                                                    leftSection={<ClockIcon />}
                                                    onClick={() => onUpdateStatus(task.id, 'pending')}
                                                >
                                                    标记为待处理
                                                </Menu.Item>
                                            )}
                                            {task.status !== 'in-progress' && (
                                                <Menu.Item
                                                    leftSection={<PlayIcon />}
                                                    color="blue"
                                                    onClick={() => onUpdateStatus(task.id, 'in-progress')}
                                                >
                                                    标记为进行中
                                                </Menu.Item>
                                            )}
                                            {task.status !== 'completed' && (
                                                <Menu.Item
                                                    leftSection={<CheckIcon />}
                                                    color="green"
                                                    onClick={() => onUpdateStatus(task.id, 'completed')}
                                                >
                                                    标记为已完成
                                                </Menu.Item>
                                            )}
                                            <Menu.Divider />
                                            <Menu.Item
                                                leftSection={<TrashIcon />}
                                                color="red"
                                                onClick={() => onDeleteTask(task.id)}
                                            >
                                                删除任务
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}

// Mobile Card View
function TaskCards({ tasks, onUpdateStatus, onDeleteTask }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <Card padding="xl" ta="center">
                <Stack align="center" gap="md">
                    <Box
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'var(--bg-elevated)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="1.5">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                    </Box>
                    <Text c="dimmed" size="lg">暂无任务</Text>
                    <Text c="dimmed" size="sm">点击上方按钮创建您的第一个任务</Text>
                </Stack>
            </Card>
        );
    }

    return (
        <Stack gap="md">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    padding="md"
                    className="card-hover"
                    style={{
                        opacity: task.status === 'completed' ? 0.7 : 1,
                    }}
                >
                    <Group justify="space-between" wrap="nowrap">
                        <Stack gap="xs" style={{ flex: 1 }}>
                            <Text
                                fw={600}
                                size="sm"
                                style={{
                                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                }}
                            >
                                {task.name}
                            </Text>
                            <Group gap="md">
                                {formatDueDate(task.dueDate)}
                                {getStatusBadge(task.status)}
                            </Group>
                        </Stack>
                        <Menu shadow="lg" position="bottom-end" withinPortal>
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray" size="lg">
                                    <MoreIcon />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown
                                style={{
                                    backgroundColor: 'var(--mantine-color-dark-7)',
                                    border: '1px solid var(--mantine-color-dark-4)',
                                }}
                            >
                                <Menu.Label>更改状态</Menu.Label>
                                {task.status !== 'pending' && (
                                    <Menu.Item
                                        leftSection={<ClockIcon />}
                                        onClick={() => onUpdateStatus(task.id, 'pending')}
                                    >
                                        待处理
                                    </Menu.Item>
                                )}
                                {task.status !== 'in-progress' && (
                                    <Menu.Item
                                        leftSection={<PlayIcon />}
                                        color="blue"
                                        onClick={() => onUpdateStatus(task.id, 'in-progress')}
                                    >
                                        进行中
                                    </Menu.Item>
                                )}
                                {task.status !== 'completed' && (
                                    <Menu.Item
                                        leftSection={<CheckIcon />}
                                        color="green"
                                        onClick={() => onUpdateStatus(task.id, 'completed')}
                                    >
                                        已完成
                                    </Menu.Item>
                                )}
                                <Menu.Divider />
                                <Menu.Item
                                    leftSection={<TrashIcon />}
                                    color="red"
                                    onClick={() => onDeleteTask(task.id)}
                                >
                                    删除
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
}

export function TaskList(props: TaskListProps) {
    return (
        <>
            {/* Desktop view */}
            <Box visibleFrom="sm">
                <TaskTable {...props} />
            </Box>
            {/* Mobile view */}
            <Box hiddenFrom="sm">
                <TaskCards {...props} />
            </Box>
        </>
    );
}
